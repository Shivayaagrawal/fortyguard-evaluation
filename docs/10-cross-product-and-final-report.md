# Cross-product assessment and final report

This close is historical. The current package is `docs/26-final-evaluation-package.md`. Do not use the tables below as the current state.

18 November 2026. No new MCP connection, REST processing call, or dashboard session was started for this close.

The Google Form has not been submitted. Ratings that need a completed use of the product stay blank.

## Phase close

| Phase | Close |
| --- | --- |
| Dashboard | Blocked. On 18 November 2026 the Safari tab at the site root showed only `upstream request timeout`. An earlier signed-in window had shown one demo heatmap, then the session left the dashboard before any interaction. |
| REST | Read-only checks done. Processing was not approved and was not called. |
| MCP | Blocked — provider-side HTTP failure observed. |
| Cross-product | Compared below, only where a surface was actually seen or a page was read. |

## MCP, as closed

1. Initialization returned HTTP 200. The next request returned HTTP 503.
2. The handshake did not complete. No tool was discovered or invoked.
3. The 503 body was `temporarily_unavailable`: "Authentication service is temporarily unavailable." `retry-after` was 5.
4. The root cause is unverified. The body does not say the API key is invalid.
5. The MCP overview, quickstart, authentication, client setup, tools, and troubleshooting pages do not explain this sequence or the session-handling behaviour. No `mcp-session-id` was returned. That absence is recorded, not treated as a protocol defect.
6. The MCP rating is not scored. There was not enough successful interaction to judge tool usability.

Evidence: `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`, unchanged. The 503 exchange is still labeled `jsonrpc_error` in that file. The correction is `evidence/mcp/configuration/2026-11-18-initialize-diagnostic-correction.json`: `http_error`. MCP-001.

Blocker: Await FortyGuard clarification on the HTTP 503 and MCP session handling before another initialization attempt.

## What each surface showed

| Question | Dashboard | REST | MCP |
| --- | --- | --- | --- |
| Could it be reached? | Login timed out, then one map loaded in Safari. | Status reads returned in about a second after an earlier timeout. | The host answered both POSTs. |
| What worked? | Demo Heatmap – Alabama, with a tile labeled `60.59°F` at `32.367693, -86.223497`. Navigation labels were visible. No control was used. | Missing key and a dummy key are different 401s. The account key gets 404, and the message names `activity_id`. The envelope is `error`, `status_code`, `details.message`. | Initialize returned FortyGuard `4.0.11`, protocol `2025-11-25`, and a tools capability. |
| What failed? | DASH-001, then the signed-in tab was gone before Phase 2B. | No processing job. API-002 is the earlier timeout, not the current status route. | HTTP 503 on the request after initialize. MCP-001. |
| Rating | Not scored. | Not scored. | Not scored. |

The three hosts did not fail as one outage. The dashboard login timed out while the status page still listed authentication as operational. REST status reads later succeeded. MCP returned a valid initialize result and then a 503. A working REST key does not mean the dashboard or the MCP handshake is available.

## Contract comparison

These are documentation findings. No runtime call confirmed or cleared them.

| Topic | REST | MCP | Finding |
| --- | --- | --- | --- |
| Authentication | `api-key` | `Authorization: Bearer` | Documented difference. Both were used as documented. |
| Activity id | `activity_id`, confirmed by the live 404 text | `heatmap_id` for heatmap reads. `analytics_id`, also accepting `activity_id`, for report reads. Routing read field not named. | API-001. Not tested with a real id. |
| Report temperature | Fahrenheit and Celsius appear in the REST text. Example `82.4`. | Tools page says Celsius. | DOC-002. |
| Heatmap polygon | FeatureCollection and Polygon both appear as examples. | "GeoJSON-style polygon," without choosing one. | DOC-003. |
| Credits | Numeric table on the REST limitations material already recorded. | Pages say usage may be consumed and depend on the plan. No numbers. | Gap. No charge was observed, because no job was submitted. |
| Direct versus async | Processing routes are activities. | `env_params`, `satellite`, and `streetview` are documented as direct. | Not compared in a live call. |

The one dashboard temperature that was visible used °F. That is a single tile on a demo heatmap. It is not a check of the report unit, and it does not confirm or contradict DOC-002.

## Final position

FortyGuard's readable contract is specific in the places an operator needs: one status route, a charge only when a job completes, a plan matrix, and an error body that matches the HTTP status and distinguishes a missing key from a bad key. The MCP docs also keep submit tools separate from read tools.

The same contract is not one contract. A caller can copy two polygon shapes, two temperature units, and more than one activity field from official pages. Those conflicts were not executed.

The product surfaces that were supposed to do the work were only partly available. The dashboard was not exercised. The API was not asked to process anything. MCP advertised tools in the initialize result and then stopped the handshake with HTTP 503. That 503 is evaluation evidence. It is not a client-configuration defect, and it is not a repaired or explained infrastructure fault.

Overall rating: not scored. A score would need a dashboard workflow, one completed or cleanly rejected API job, and at least a tool list.

## Form

Draft answers are in `docs/FINAL_GOOGLE_FORM_RESPONSES.md`. Questions 6, 7, 12, and 14 stay blank. The form was not submitted.

## If this is reopened

Blocker: Await FortyGuard clarification on the HTTP 503 and MCP session handling before another initialization attempt. A retry needs a meaningful change: a confirmed fix, service recovery, or new technical guidance.

If that happens, and a retest is wanted: one handshake, then `tools/list`, still with no processing tool until a spend limit is approved. The dashboard would need the map session restored before any further UI testing. Neither is part of this close.
