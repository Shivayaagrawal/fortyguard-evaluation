# REST API functional evaluation

18 November 2026. Started only after the dashboard gate in `docs/16-dashboard-final-completion.md` closed as blocked.

No new live request was sent. The completed environmental-parameters job and the earlier status reads were not repeated. No credit was spent. The Google Form was not submitted.

The endpoint table comes from the indexed contract in `src/api/endpoints.ts`. The introduction page was read again on 18 November 2026. It describes the product and the plan labels BOTH, BASIC, and PREMIUM. It does not publish a path list, so no endpoint was added from that page. `docs/api/06-api-summary.md` still says no POST was sent. That sentence is historical. The live job is the evidence below.

## 1. Overview

Base URL `https://api.fortyguard.com`. Authentication header `api-key`. The indexed surface is six asynchronous POST operations and one shared status read. One POST has been completed. The status read has been seen as HTTP 401, HTTP 404, and HTTP 200.

## 2. Endpoint inventory

| Endpoint | Method | Purpose | Documented Premium cost | This evaluation |
| --- | --- | --- | --- | --- |
| `/v1/heatmap` | POST | Area temperature heatmap | 4,220 | Not called. Documented 3,500 on Basic and Startup. |
| `/v1/env_params` | POST | Point environmental parameters | 2,900 | Called once. Completed. Observed charge 2,900. |
| `/v1/status/{activity_id}` | GET | Read an activity | 0 in the local inventory | Live 401, 404, and one Completed 200. |
| `/v1/routing` | POST | Temperature-aware route | 3,500 | Not called. Premium only in the inventory. |
| `/v1/heat_intelligence` | POST | Heat Intelligence report | 8,600 | Not called. Premium only. |
| `/v1/streetview` | POST | Street-level segmentation | 8,600 | Not called. Premium only. |
| `/v1/satellite` | POST | Satellite segmentation | 14,400 | Not called. Premium only. Highest documented cost. |

No other REST path was used, and none is invented here. The introduction names Temperature Property Reports. The indexed inventory has no matching POST.

## 3. Risk matrix

| Class | Endpoints | Live test | Local fixture | Credit risk |
| --- | --- | --- | --- | --- |
| Read-only and free | `GET /v1/status/{activity_id}` | Already done | Activity id and status words | Documented as 0. The 401 and 404 bodies did not show a charge. The balance was not read between those calls. |
| Read-only but billable | None documented | Not applicable | Not applicable | Do not invent one. |
| Direct processing | None observed on REST | Not applicable | Not applicable | MCP `env_params` does not say it returns an activity id. That is not evidence that REST is direct. REST was asynchronous. |
| Asynchronous processing | All six POST paths | Only `env_params` | Request fixtures exist | Every POST is documented as billable on completion. |
| High cost | `heat_intelligence` 8,600, `streetview` 8,600, `satellite` 14,400 | Not called | Request fixtures exist | Not authorised. |

## 4. Authentication

| Call | HTTP | Body | Evidence |
| --- | --- | --- | --- |
| Status read, no `api-key` | 401 | "Missing required 'api-key' header. Send your key in the 'api-key' request header." | `evidence/api/errors/2026-11-18T11-26-17-525Z-status-missing-key.json` |
| Status read, invalid key | 401 | "Invalid or unknown API key." | `evidence/api/errors/2026-11-18T11-26-18-624Z-status-invalid-key.json` |
| Status read, account key, unknown id | 404 | "No activity found for the provided activity_id." | `evidence/api/errors/2026-11-18T11-26-18-990Z-status-unknown-id.json` |
| `POST /v1/env_params` with the account key | 200 | Activity accepted | `evidence/api/responses/2026-11-18-env-params.json` |

The account key is recognized. The two 401 messages are different. All three errors use `error`, `status_code`, and `details.message`, and the HTTP status matches `status_code`.

Finding API-003, if numbered as the live envelope: confidence confirmed, severity is a strength rather than a defect. Form questions: API design and additional comments.

## 5. Environmental-parameters workflow

Activity `98a664cb-d9bb-484c-82a1-3d23ed9c7365`.

| Check | Live result | Evidence |
| --- | --- | --- |
| Submit | HTTP 200. Message "Environment Parameters Analysis Submitted Successfully". `data.activity_id` only. | `evidence/api/responses/2026-11-18-env-params.json` |
| Status | HTTP 200. Message and `data.status` are `Completed`. | `evidence/api/responses/2026-11-18-env-params-status.json` |
| Coordinates | Request and result both `33.4484, -112.074`. | Both files |
| Time | `2025-09-20T14:00:00-07:00`, `America/Phoenix`, offset `-7`. Start equals end. Interval `1h`. Count 1. | Status file |
| Units | Celsius, percent, millimetres, octas, ppb, ppm, and W/m² are in the names or the solar description. | Status file |
| Usable without another data call | Yes. The series is in the body. | Status file |
| Credit field | Absent. | Status file has no credit key |
| Balance | 1,000,000 then 997,100. Difference 2,900. Plan `premium`. The balance read itself cost 0. | `evidence/mcp/executions/2026-11-18-credit-balance-before.json`, `evidence/mcp/executions/2026-11-18-credit-balance.json` |

The documented Premium price is 2,900. The observed deduction matches it. The receipt is the balance change, not the job.

## 6. Input validation

Local only. `npm test` on 18 November 2026: 24 passed. These tests parse fixtures in `src/api/schemas.ts`. They were not sent to `api.fortyguard.com`.

| Case | Local fixture | Live server |
| --- | --- | --- |
| Missing temperature | Rejected | Not sent |
| Latitude 91 | Rejected | Not sent |
| Heatmap ring shorter than four positions | Rejected | Not sent |
| MultiPolygon | Rejected | Not sent |
| Acceptance body with no `activity_id` | Rejected | Not sent |
| Status word `queued` | Rejected. `Processing` and `succeeded` are accepted by the fixture. | Not sent |
| Invalid date string | Not covered by a dedicated test | Not sent |
| Unsupported `filter_type` | The fixture allows 1, 2, 3, and 4. A wrong value is not asserted. | Not sent |
| Extra fields | Not asserted. The fixture does not use strict objects. | Not sent |
| Temperature unit | The fixture stores a number. It has no unit enum, because the indexed environmental request has no unit field. | Not sent |

A live validation POST was not sent. A rejected body is documented as free, but a timeout can still accept a job. That is not a free test.

## 7. Asynchronous design

The one observed lifecycle is submit, receive `activity_id`, then `GET /v1/status/{activity_id}` until `Completed`. The submit body did not contain the measurements. The status body did.

The same status route is documented for the other five POST operations. That shared route was not used for a heatmap, route, report, or image. Sharing a path in the documentation is not proof that those jobs return the same result shape.

The completed status word was `Completed`. The quickstart also mentions `succeeded` and `error`. Those words were not returned by this job.

Pagination is not documented for these task endpoints and was not seen.

## 8. Error handling

The three live error bodies are consistent with each other and with their HTTP statuses. An earlier status read, API-002, returned no HTTP response during the 17 November outage. That record stays historical. The same route answered on 18 November.

No HTTP 400, 409, 429, or 5xx was captured from a REST call in the successful window. Do not describe those codes as observed.

## 9. Credit transparency

| Source | What it shows |
| --- | --- |
| Completed job | No cost, no plan, no remaining balance |
| Premium price table | 2,900 for this endpoint |
| MCP `credit_balance` | 1,000,000, then 997,100, plan `premium`, read cost 0 |

The charge can be reconstructed. It is not printed on the result a developer stores.

## 10. Documentation inconsistencies

| ID | What is confirmed | What is not |
| --- | --- | --- |
| DOC-002 | REST Heat Intelligence text uses Fahrenheit and Celsius. Example `82.4`. Live MCP `report` says Fahrenheit. The published MCP page says Celsius. | Which unit the server stores. No report was submitted. |
| DOC-003 | Indexed examples use both a FeatureCollection and a Polygon. Live MCP heatmap schema accepts Polygon, Feature, or FeatureCollection. | Which shape `POST /v1/heatmap` executes. |
| API-001 | REST submit, status, and the 404 use `activity_id`. MCP `report_read` requires `analytics_id`. `heatmap_read` accepts `activity_id` or `heatmap_id`. | Whether the report-read alias works. |
| Introduction plan labels | The page read on 18 November lists BOTH, BASIC, and PREMIUM. | Startup remains in the older limitations table and is absent from this introduction. |

## 11. Developer experience

A caller with the key can submit one environmental job, poll one status URL, and use the result without a second data request. The caller cannot see the price in that result. The caller cannot tell from REST alone which id field an MCP read tool wants. The report unit has to be guessed.

## 12. Strengths

- The completed payload names units and keeps the coordinate and the Phoenix offset.
- The observed 2,900-credit charge matches the Premium table.
- Missing and invalid keys are different 401s, and an unknown id is a 404.
- One status route is documented for every asynchronous product, and it worked for this job.

## 13. Weaknesses

- The completed body has no credit cost.
- Report temperature, polygon examples, and activity identifiers are not one contract.
- Five of the six processing routes are untested. Their costs are documented, so they were not used to fill the gap.

## 14. Unverified

- Server-side validation of a bad POST.
- `Failed` is free. No failed job was created.
- REST idempotency. MCP heatmap has an optional `idempotency_key`. REST has no observed equivalent.
- Result shapes for heatmap, routing, heat intelligence, street view, and satellite.
- Whether `filter_type` 4, present in the local fixture and the live MCP schema, is accepted by REST. The environmental page reviewed earlier documented types 1, 2, and 3.
- A REST balance endpoint. None was called, and none is in the indexed inventory.

## 15. Recommendations

1. Put the credits charged on the completed status body. The 2,900 figure is already confirmed by the balance change.
2. Use one report temperature unit in the field name, the REST page, the MCP schema, and the example.
3. Accept `activity_id` on every read, and generate heatmap examples from one schema.
4. No further paid call is required to close this evaluation.

## 16. Paid operations intentionally not executed

Their contracts, costs, and workflows were reviewed. They were not sent. This table is not a list of unfinished checks.

| Operation | Documented Premium cost | Contract reviewed | Live execution |
| --- | --- | --- | --- |
| `POST /v1/routing` | 3,500 | Yes. Origin, destination, departure time, Premium only. | Not executed. |
| `POST /v1/heatmap` | 4,220 | Yes. Polygon input. Examples disagree on shape. | Not executed. |
| `POST /v1/heat_intelligence` | 8,600 | Yes. Unit text disagrees with itself. | Not executed. |
| `POST /v1/streetview` | 8,600 | Yes. Point, angles, and back view. | Not executed. |
| `POST /v1/satellite` | 14,400 | Yes. Nested location. Highest documented cost. | Not executed. |

## 17. Finding map

| ID | Evidence | Form question in the 19-question draft | Confidence | Severity |
| --- | --- | --- | --- | --- |
| API-002 | `evidence/api/errors/2026-11-17-status-read-timeout.md` | 8, 12, 19 | Confirmed for that outage. The route later answered. | P1 for the outage. Not the current state. |
| API-003 | The three 18 November error files and the completed status file | 6, 12, 19 | Confirmed | Strength |
| DOC-002 | Indexed excerpts, live MCP `report` schema, rendered Heat Intelligence text | 12, 14, 17, 19 | Confirmed for the texts. Unverified at runtime. | High if a paid report uses the wrong unit. |
| DOC-003 | Indexed excerpts and the live heatmap schema | 12, 14 | Confirmed for the examples. Runtime untested. | Costly if the first copied body is rejected or misread. |
| API-001 | Completed job, 404 text, `tools/list` | 12, 14, 17 | Confirmed for the names. Alias untested. | P2 |
| Credit omission | Status JSON has no credit field. Balance files show 2,900. | 7, 12, 14, 19 | Confirmed | P2 for a developer who has to reconcile spend. |

## 18. Cross-product

REST and MCP do not get the same verdict because they share names.

| Topic | REST, observed | MCP, observed | Not inferred |
| --- | --- | --- | --- |
| Temperature unit | Environmental fields are Celsius. Heat Intelligence text is mixed. | Live `report` says Fahrenheit. `env_params` says Celsius. | The dashboard `60.59°F` tile does not decide the report unit. |
| Identifier | `activity_id` on the completed job and the 404 | `activity_id` required for routing read. `analytics_id` required for report read. | A REST id is not known to satisfy `report_read`. |
| Lifecycle | Submit, then status, then `Completed` | `credit_balance` returned immediately. Processing tools were not called. | MCP `env_params` is not known to be asynchronous. |
| Credits | Absent from the job. Visible in a separate balance read. | Stated on the tool before a call. | The dashboard did not show a balance on the screens that loaded. |
| Errors | 401 and 404 JSON | HTTP 503 `temporarily_unavailable` after a valid initialize, then a later success | The dashboard gateway lines are a third format. |
| Discovery | Seven indexed routes. Introduction does not list them. | Eleven live tools, nine published. | The catalogues are not the same list. |
