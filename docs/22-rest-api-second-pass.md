# REST API second pass

18 November 2026, 12:50 UTC. No POST was sent. No credit was spent by these calls. The known job was only reread.

Evidence is under `evidence/phase11/rest-api/`. The November 18 morning files were not changed.

| Endpoint | Documentation | Authentication | Validation this pass | Response | Async | Credits | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `GET /v1/status/does-not-exist` | Quickstart | No key | Missing header | HTTP 401. "Missing required 'api-key' header." | Read | Not in the body | PASS |
| Same path | Quickstart | Invalid key | Rejected key | HTTP 401. "Invalid or unknown API key." | Read | Not in the body | PASS |
| Same path | Quickstart | Account key | Unknown id | HTTP 404. "No activity found for the provided activity_id." | Read | Not in the body | PASS |
| `GET /v1/status/98a664cb-d9bb-484c-82a1-3d23ed9c7365` | Quickstart | Account key | Existing id | HTTP 200. `Completed`. Coordinates `33.4484, -112.074`. Phoenix `-07:00`. No credit field. | Read of a finished job | Not in the body | PASS |
| `POST /v1/env_params` | Environmental page. Celsius. 2,900 Premium. | Account key on the earlier job | Not re-sent | The morning job still reads as Completed. | Submit then status, from the earlier live job | Observed 2,900 on 18 Nov 11:32 UTC. Not repeated. | NOT TESTED as a new call |
| `POST /v1/heatmap` | 4,220 Premium. Polygon and FeatureCollection examples. | Not sent | Local fixtures only | None | Documented async | Not observed | NOT TESTED |
| `POST /v1/routing` | 3,500 Premium. 200 km cap. | Not sent | Not sent | None | Documented async | Not observed | NOT TESTED |
| `POST /v1/heat_intelligence` | 8,600 Premium. Mixed unit text. | Not sent | Not sent | None | Documented async, then a temporary link | Not observed | NOT TESTED |
| `POST /v1/streetview` | Article not extracted. MCP page describes the tool. | Not sent | Not sent | None | Not observed | Not observed | NOT TESTED |
| `POST /v1/satellite` | Article not extracted. MCP page describes the tool. | Not sent | Not sent | None | Not observed | Not observed | NOT TESTED |

The four status results match the earlier successful error contract. The earlier timeout is not the current behavior of this route. Local fixture tests were not repeated and are not live tests.

A new processing POST was not sent. Any of those requests can create a billable job. They remain awaiting approval.
