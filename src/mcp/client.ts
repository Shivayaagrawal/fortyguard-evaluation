import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { logInfo } from "../utils/logger.js";
import { requireEnv } from "../utils/test-helpers.js";
import { compareCatalog, type DiscoveredTool } from "./discovery.js";

/**
 * Connects to the documented remote MCP endpoint.
 * Not called by the planning tests. Phase 4 calls `discoverTools` once
 * before any tool invocation.
 */
export async function connectFortyGuardMcp(): Promise<{
  client: Client;
  close: () => Promise<void>;
}> {
  const endpoint = requireEnv("FORTYGUARD_MCP_URL");
  const apiKey = requireEnv("FORTYGUARD_API_KEY");
  const client = new Client(
    { name: "fortyguard-evaluation", version: "0.1.0" },
    { capabilities: {} },
  );
  const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  });
  logInfo("mcp connect", { endpoint });
  await client.connect(transport);
  return {
    client,
    close: async () => {
      await client.close();
    },
  };
}

export async function discoverTools(client: Client): Promise<{
  tools: DiscoveredTool[];
  missingFromServer: string[];
  undocumentedOnServer: string[];
}> {
  const listed = await client.listTools();
  const tools: DiscoveredTool[] = listed.tools.map((tool) => {
    const discovered: DiscoveredTool = {
      name: tool.name,
      inputSchema: tool.inputSchema,
    };
    if (tool.description !== undefined) {
      discovered.description = tool.description;
    }
    return discovered;
  });
  return { tools, ...compareCatalog(tools) };
}
