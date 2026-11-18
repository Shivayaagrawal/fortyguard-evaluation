# MCP connection

One attempt on 17 November 2026. It was not repeated.

| Item | Result |
| --- | --- |
| URL | `https://tos-mcp.app.fortyguard.com/mcp` |
| Auth | `Authorization: Bearer`, value read from `FORTYGUARD_API_KEY`. The value was not written into a config file. |
| Client | Official MCP TypeScript SDK `StreamableHTTPClientTransport`, package `@modelcontextprotocol/sdk` 1.32.2, script `scripts/mcp-discover-once.ts`. |
| Cursor UI | Not used for this attempt. A project MCP config would have had to store the bearer token. The network failure happened before tool selection, so the IDE panel was not required. |
| Result | Failed |
| Error | `Streamable HTTP error: Error POSTing to endpoint: upstream request timeout` |
| Elapsed | About 17 seconds |
| Protocol version | Not returned |
| Server info | Not returned |
| Tools | Not listed |

The same endpoint had already failed earlier in the day (MCP-001): a request with no credential received no bytes. This attempt used the account key, which the REST status read had just accepted. The key is not the thing that timed out. The MCP edge did not answer.

No tool was invoked.
