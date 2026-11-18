# REST and MCP comparison

Update, 18 November 2026: the MCP handshake is no longer an edge timeout. Initialize returned HTTP 200. The next POST returned HTTP 503 with `temporarily_unavailable`. The table below is the earlier comparison. The current write-up is `docs/mcp/07-documentation-and-failure-analysis.md`.

Live MCP column is empty because the session did not start. REST values that were observed are marked. The rest are from the indexed docs.

| Area | REST API | MCP | Result |
| --- | --- | --- | --- |
| Authentication | `api-key` header. Observed: missing key 401, invalid key 401, account key accepted on a status read. | `Authorization: Bearer` with the same key. The POST timed out before an auth status was returned. | Different headers, as documented. This attempt could not show whether the bearer token was checked. |
| Processing IDs | `activity_id`. The live 404 uses that name. | `heatmap_id` and `analytics_id` in the docs. | REST name is verified. MCP names are still documentation only. |
| Geometry | FeatureCollection and bare Polygon both appear as examples. | Not retrieved. | Unverified on MCP. |
| Temperature unit | Heat Intelligence page disagrees with itself. Environmental parameters are documented as Celsius. | Report tool is documented as Celsius. | Unverified at runtime on both sides. |
| Status | `GET /v1/status/{activity_id}` answered 404 for an unknown id. | Read tools were not called. | REST read works. MCP read was not reached. |
| Errors | `error`, `status_code`, `details.message`. HTTP status matched. | Body was the gateway text `upstream request timeout`, not that JSON envelope. | The MCP failure was an edge timeout, not an application error. |

A working REST key does not mean the MCP host is up. The integration consequence is that an agent cannot fall back to a clear 401 or 404. It waits and then sees a gateway timeout.
