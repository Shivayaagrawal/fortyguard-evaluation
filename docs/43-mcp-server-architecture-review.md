# MCP server architecture review

18 November 2026. The FortyGuard MCP server source is not in this repository. Protocol behavior below is what the live endpoint and the client SDK did. It is not a reading of server handlers.

## Search

`src/mcp/` contains a client, a nine-tool catalog fixture, an HTTP response classifier, and a list of planned cases. `tool-tests.ts` does not call a tool. There is no `McpServer`, no tool registration, and no transport server.

SDK packages under `node_modules/@modelcontextprotocol/sdk` are the client library, not FortyGuard's server.

## Finding

| ID | Component | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-001 | MCP server | `src/mcp/` and the workspace root. | Server source if a white-box review is required. | No server source. | Registration, validation, credit deduction, and user isolation cannot be inspected. | Not a product defect. It blocks the white-box review. | Confirmed |

The trace `Transport → Authentication → Initialization → Tool Registration → Schema → Handler → Service → MCP Response` stops at the network. The handler and service steps are unavailable.

## What the live endpoint showed

These are protocol observations, not source findings.

| Step | Observation | Evidence |
| --- | --- | --- |
| Transport | Streamable HTTP to `https://tos-mcp.app.fortyguard.com/mcp` completed in the QA run. | QA discovery file. Elapsed 6,454 ms. |
| Authentication | One Bearer header. The server then listed tools and answered `credit_balance`. | Same file. `cost_credits` 0. |
| Initialization | An earlier run received protocol `2025-11-25`, server FortyGuard 4.0.11, and `tools.listChanged: true`, then HTTP 503. A later handshake and the QA handshake completed. | `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json` and the QA file. |
| Session | The 503 response had no `mcp-session-id`. Whether the server is stateless was not proven. | Diagnostic note in `docs/mcp/07-documentation-and-failure-analysis.md`. |
| Registration | Eleven tools came back from `tools/list`. Their JSON schemas are the registration this client can see. | QA digest. |
| Recovery | The 503 body said `temporarily_unavailable` and `retriable: true`, with `retry-after: 5`. The client did not retry that call. | Original diagnostic JSON. |

Tool handlers, output transformation, and the service each tool calls are not visible. A schema that says a tool is paid does not show the deduction code.

## Security that was not reviewed

User-to-user access control, secret storage, query sanitization, and whether a tool can spend credits without a server-side confirmation are server-side. They were not reviewed. The evaluation client does not put the key in tool arguments. `credit_balance` was the only call, and its saved result did not contain the key.

`monitoring` advertises `delete_monitor` and `delete_heatmap_data` on the live schema. Those operations were not called. Their authorization rules are unknown.

## Local client quality

The classifier in `src/mcp/http-classification.ts` treats a non-2xx response as `http_error` before it looks for a JSON-RPC error. That matches the 503 body, which is not a JSON-RPC error. The unit tests cover that distinction. They do not start the remote server.

No server configuration was changed. No destructive tool was run.
