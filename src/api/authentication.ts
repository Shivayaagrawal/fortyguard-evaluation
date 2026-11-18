import { requireEnv } from "../utils/test-helpers.js";

/**
 * REST authentication documented at /docs/authentication.
 * Header name is `api-key`. There is no documented OAuth exchange.
 * MCP uses a different header for the same key. See src/mcp/client.ts.
 */
export function apiKeyHeaders(): Record<string, string> {
  return {
    "api-key": requireEnv("FORTYGUARD_API_KEY"),
    "content-type": "application/json",
    accept: "application/json",
  };
}
