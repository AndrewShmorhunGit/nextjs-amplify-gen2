import fs from "fs";
import path from "path";

export function getWebSocketUrl(): string | null {
  try {
    const raw = fs.readFileSync(path.resolve("amplify_outputs.json"), "utf8");
    const parsed = JSON.parse(raw);
    return parsed.custom?.websocketUrl ?? null;
  } catch (err) {
    console.error("❌ Failed to read Amplify-outputs.json:", err);
    return null;
  }
}
