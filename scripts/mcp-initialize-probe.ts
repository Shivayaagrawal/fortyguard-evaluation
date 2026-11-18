const key = process.env.FORTYGUARD_API_KEY?.trim();
const endpoint = process.env.FORTYGUARD_MCP_URL?.trim();

if (!key || !endpoint) {
  console.error("Missing MCP endpoint or API key.");
  process.exit(1);
}

function redact(value: string): string {
  return value.split(key as string).join("[redacted]");
}

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 12_000);

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "fortyguard-evaluation", version: "0.1.0" },
      },
    }),
    signal: controller.signal,
  });
  const text = await response.text();
  console.log(redact(`mcp-initialize ${response.status} bytes=${text.length}`));
  console.log(redact(text.slice(0, 500)));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(redact(`mcp-initialize ERROR ${message}`));
} finally {
  clearTimeout(timer);
}
