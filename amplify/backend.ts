import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { auth } from "./auth/resource";
import { createWebSocketBackend } from "./websocket/backend";
import { websocketHandlerSettings } from "./websocket/settings";

const backend = defineBackend({
  data,
  auth,
  websocketFunction: defineFunction(websocketHandlerSettings),
});

export type AppBackend = typeof backend;

// Attach WebSocket infra separately
createWebSocketBackend(backend);

export default backend;
