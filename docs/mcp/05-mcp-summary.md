# MCP phase summary

Update, 18 November 2026: one later handshake returned HTTP 200 for initialize and HTTP 503 for the following POST. No tools were listed or invoked. See `docs/mcp/07-documentation-and-failure-analysis.md`. The sections below describe the earlier timeout.

## 1. Connection

Failed once. `POST https://tos-mcp.app.fortyguard.com/mcp` returned `upstream request timeout` after about 17 seconds. Bearer authentication was attached. The server did not complete initialization.

## 2. Authentication

Not decided by the server. The same account key had just been accepted by `GET /v1/status/does-not-exist` (404 rather than 401). The MCP timeout happened before a 401 or a session. This is not an invalid-key result.

## 3. Tools discovered

0 of 9.

## 4. Schemas inspected

0 from the server. The documented nine-tool list was not treated as a discovery result.

## 5. Tools invoked

None. Read tools were not called, because there is no activity id from this evaluation and their credit behavior was not confirmed by a live schema. Processing tools were not called.

## 6. Not performed

| Test | Reason |
| --- | --- |
| Second connection attempt | The phase rule is one failure, then stop. |
| `tools/list` | Initialization did not finish. |
| Invalid-parameter calls | No tool was available to call. |
| Natural-language tool selection in the Cursor chat | The server never offered tools. |
| Paid processing | Out of this phase. |

## 7. Findings

MCP-001 stays the availability finding. This attempt adds the exact error string and shows the failure still happens after the REST API has recovered.

No schema defect was confirmed or cleared.

## 8. Positive observations

- The client failed closed. It did not invent a tool list.
- REST and MCP are separate hosts. The API can answer while MCP times out, which is a real boundary rather than one shared outage.
- The documented split between submit tools and read tools is still the right agent shape, if the server comes back. It was not tested.

## 9. Rating

Not scored. Connection, discovery, and invocation did not succeed, and a score needs at least a tool list.

## 10. Form notes

What was tried: one Streamable HTTP initialize with the documented bearer token, using the official TypeScript SDK. Cursor's MCP settings panel was not given the key.

What failed: the MCP edge, with `upstream request timeout`.

What was not claimed: tool use, processing, or a rating.

## 11. Phase 5

Closed without another connection. The comparison of the surfaces that were actually observed is `docs/10-cross-product-and-final-report.md`. MCP remains Blocked — provider-side HTTP failure observed. The rating stays unscored.
