import { WebSocketApi, WebSocketStage } from "aws-cdk-lib/aws-apigatewayv2";
import { WebSocketLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { RemovalPolicy } from "aws-cdk-lib";
import type { AppBackend } from "backend";

export const createWebSocketBackend = (backend: AppBackend) => {
  // Get Lambda function from backend definition
  const lambda = backend.websocketFunction.resources.lambda;
  // Create a custom stack for WebSocket infra
  const websocketStack = lambda.stack;

  // Create DynamoDB table before assigning permissions
  const connectionsTable = new Table(websocketStack, "ConnectionsTable", {
    tableName: "websocket-connections",
    partitionKey: { name: "connectionId", type: AttributeType.STRING },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });
  connectionsTable.applyRemovalPolicy(RemovalPolicy.DESTROY);

  // Create WebSocket API with all route integrations
  const webSocketApi = new WebSocketApi(websocketStack, "WebSocketApi", {
    connectRouteOptions: {
      integration: new WebSocketLambdaIntegration("ConnectIntegration", lambda),
    },
    disconnectRouteOptions: {
      integration: new WebSocketLambdaIntegration(
        "DisconnectIntegration",
        lambda
      ),
    },
    defaultRouteOptions: {
      integration: new WebSocketLambdaIntegration("DefaultIntegration", lambda),
    },
  });

  // Create stage for WebSocket API
  const websocketStage = new WebSocketStage(websocketStack, "WebSocketStage", {
    webSocketApi,
    stageName: "prod",
    autoDeploy: true,
  });

  // Permissions: DynamoDB access
  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:Scan"],
      resources: [connectionsTable.tableArn],
    })
  );

  // Permissions: API Gateway connections
  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["execute-api:ManageConnections"],
      resources: [webSocketApi.arnForExecuteApiV2("*", "*")],
    })
  );

  // Optional log group configuration
  new LogGroup(websocketStack, "WebSocketLambdaLogs", {
    logGroupName: `/aws/lambda/${lambda.functionName}`,
    retention: RetentionDays.THREE_DAYS,
    removalPolicy: RemovalPolicy.DESTROY,
  });

  // Output WebSocket URL
  backend.addOutput({
    custom: {
      websocketUrl: websocketStage.url,
    },
  });
};
