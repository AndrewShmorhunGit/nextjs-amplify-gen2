import type { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("WebSocket Event:", JSON.stringify(event, null, 2));

  const connectionId = event.requestContext.connectionId!;
  const routeKey = event.requestContext.routeKey;
  const domainName = event.requestContext.domainName!;
  const stage = event.requestContext.stage!;

  try {
    // Handle $connect: store new connection in DynamoDB
    if (routeKey === "$connect") {
      await docClient.send(
        new PutCommand({
          TableName: process.env.CONNECTIONS_TABLE_NAME!,
          Item: {
            connectionId,
            timestamp: Date.now(),
          },
        })
      );
      console.log(`Connection stored: ${connectionId}`);
    }

    // Handle $disconnect: remove connection from DynamoDB
    else if (routeKey === "$disconnect") {
      await docClient.send(
        new DeleteCommand({
          TableName: process.env.CONNECTIONS_TABLE_NAME!,
          Key: { connectionId },
        })
      );
      console.log(`Connection removed: ${connectionId}`);
    }

    // Handle $default: broadcast connection count to all clients
    else if (routeKey === "$default") {
      const message = JSON.parse(event.body || "{}");
      console.log("Received message:", message);

      // Only respond if the message requests connection count
      if (message.type === "GET_COUNT") {
        // Get total connection count
        const scanResult = await docClient.send(
          new ScanCommand({
            TableName: process.env.CONNECTIONS_TABLE_NAME!,
          })
        );

        const connections = scanResult.Items || [];
        const connectionCount = connections.length;
        console.log(`Current connection count: ${connectionCount}`);

        // Initialize API Gateway client to push messages
        const apiGateway = new ApiGatewayManagementApiClient({
          endpoint: `https://${domainName}/${stage}`,
        });

        // Broadcast the count to all active connections
        const broadcast = connections.map(async (conn) => {
          try {
            await apiGateway.send(
              new PostToConnectionCommand({
                ConnectionId: conn.connectionId,
                Data: JSON.stringify({
                  type: "COUNT",
                  count: connectionCount,
                }),
              })
            );
          } catch (err: any) {
            // If connection is stale (gone), delete it
            if (err.statusCode === 410) {
              console.warn(`Removing stale connection: ${conn.connectionId}`);
              await docClient.send(
                new DeleteCommand({
                  TableName: process.env.CONNECTIONS_TABLE_NAME!,
                  Key: { connectionId: conn.connectionId },
                })
              );
            } else {
              console.error(
                `Failed to send to ${conn.connectionId}:`,
                err.message || err
              );
            }
          }
        });

        await Promise.all(broadcast);
      }
    }

    return {
      statusCode: 200,
      body: "OK",
    };
  } catch (error) {
    console.error("WebSocket error:", error);
    return {
      statusCode: 500,
      body: "Error",
    };
  }
};
