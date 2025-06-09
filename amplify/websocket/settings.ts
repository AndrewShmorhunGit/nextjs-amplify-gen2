export const websocketHandlerSettings = {
  name: "websocket-handler",
  entry: "./websocket/handler.ts",
  environment: {
    CONNECTIONS_TABLE_NAME: "websocket-connections",
  },
  resourceGroupName: "websocket-stack",
};
