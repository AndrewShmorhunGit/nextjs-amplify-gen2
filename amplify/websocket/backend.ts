import { WebSocketApi, WebSocketStage } from "aws-cdk-lib/aws-apigatewayv2";
import { WebSocketLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { RemovalPolicy } from "aws-cdk-lib";
import type { AppBackend } from "backend";

export const createWebSocketBackend = (backend: AppBackend) => {
  // Create WebSocket stack
  const websocketStack = backend.createStack("websocket-stack");

  // Use lambda function defined in defineBackend
  const websocketHandler = backend.websocketFunction.resources.lambda;

  // DynamoDB table for WebSocket connections
  const connectionsTable = new Table(websocketStack, "ConnectionsTable", {
    tableName: "websocket-connections",
    partitionKey: { name: "connectionId", type: AttributeType.STRING },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });
  connectionsTable.applyRemovalPolicy(RemovalPolicy.DESTROY);

  // WebSocket API and integrations
  const webSocketApi = new WebSocketApi(websocketStack, "WebSocketApi", {
    connectRouteOptions: {
      integration: new WebSocketLambdaIntegration(
        "ConnectIntegration",
        websocketHandler
      ),
    },
    disconnectRouteOptions: {
      integration: new WebSocketLambdaIntegration(
        "DisconnectIntegration",
        websocketHandler
      ),
    },
    defaultRouteOptions: {
      integration: new WebSocketLambdaIntegration(
        "DefaultIntegration",
        websocketHandler
      ),
    },
  });

  const webSocketStage = new WebSocketStage(websocketStack, "WebSocketStage", {
    webSocketApi,
    stageName: "prod",
    autoDeploy: true,
  });

  // Grant Lambda permissions
  websocketHandler.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:Scan"],
      resources: [connectionsTable.tableArn],
    })
  );

  websocketHandler.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["execute-api:ManageConnections"],
      resources: [webSocketApi.arnForExecuteApiV2("*", "*")],
    })
  );

  // Optional: Create log group with retention
  new LogGroup(websocketStack, "WebSocketLambdaLogs", {
    logGroupName: `/aws/lambda/${websocketHandler.functionName}`,
    retention: RetentionDays.THREE_DAYS,
    removalPolicy: RemovalPolicy.DESTROY,
  });

  // Output WebSocket URL
  backend.addOutput({
    custom: {
      websocketUrl: webSocketStage.url,
    },
  });
};
