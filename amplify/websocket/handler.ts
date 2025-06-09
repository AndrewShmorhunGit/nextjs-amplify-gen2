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
    // Handle connection
    if (routeKey === "$connect") {
      // Store connection in DynamoDB
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
    // Handle disconnection
    else if (routeKey === "$disconnect") {
      // Remove connection from DynamoDB
      await docClient.send(
        new DeleteCommand({
          TableName: process.env.CONNECTIONS_TABLE_NAME!,
          Key: { connectionId },
        })
      );
      console.log(`Connection removed: ${connectionId}`);
    }
    // Handle messages
    else if (routeKey === "$default") {
      const message = JSON.parse(event.body || "{}");
      console.log("Received message:", message);

      // If client requests connection count
      if (message.type === "GET_COUNT") {
        // Get connection count
        const connections = await docClient.send(
          new ScanCommand({
            TableName: process.env.CONNECTIONS_TABLE_NAME!,
            Select: "COUNT",
          })
        );

        const connectionCount = connections.Count || 0;
        console.log(`Current connection count: ${connectionCount}`);

        // Send response to client
        const apiGateway = new ApiGatewayManagementApiClient({
          endpoint: `https://${domainName}/${stage}`,
        });

        await apiGateway.send(
          new PostToConnectionCommand({
            ConnectionId: connectionId,
            Data: JSON.stringify({
              type: "COUNT",
              count: connectionCount,
            }),
          })
        );
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
