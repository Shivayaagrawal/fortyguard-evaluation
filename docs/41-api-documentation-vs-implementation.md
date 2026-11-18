# API documentation versus implementation

18 November 2026. The Implementation column is the FortyGuard server. That source is not in the repository, so every server cell is unavailable. Actual behavior is a black-box result where one exists. A documentation conflict is not labeled a runtime defect unless a response or a live schema shows it.

No paid route was called for this comparison.

| Endpoint | Documentation | Implementation | Actual behavior | Mismatch | Severity |
| --- | --- | --- | --- | --- | --- |
| `GET /v1/status/{activity_id}` | `api-key`. 401, 404, and Completed. Result body on success. No separate credit price. | Source unavailable. | Four reads at 13:13 UTC: missing key 401, invalid key 401, unknown id 404, known job 200 `Completed`. Messages name the header or `activity_id`. | The live envelope matches itself. The quickstart never shows that envelope. 400, 403, 422, 429, and 500 were not produced. | Low for the missing example. Untested codes are a coverage gap. |
| `POST /v1/env_params` | Async activity. Celsius. 2,900 Premium. Completed shape is metadata, locations, parameters, solar. Null means missing. | Source unavailable. | One earlier job completed and was reread. Coordinate `33.4484, -112.074`, temperature 35, Phoenix offset, unit-bearing names. No credit field. The body did not need the null rule. | Documented workflow matches this one job. The 2,900 figure is a balance difference, not a server charge field. Other filter types were not sent. | Medium for the missing credit field. Not a failed job. |
| `POST /v1/heatmap` | Async. Polygon example on the endpoint page. FeatureCollection in the quickstart. 4,220 Premium. | Source unavailable. | Not executed. | The two examples disagree. The live MCP schema accepts Polygon, Feature, and FeatureCollection. That does not prove the REST server does. | Medium. Documentation only. |
| `POST /v1/routing` | Async. Premium 3,500. 200 km. Bounded coordinates. | Source unavailable. | Not executed. | None established at runtime. | Not rated as a defect. |
| `POST /v1/heat_intelligence` | Async. Fahrenheit in the temperature field, Celsius in the date sentence, example `82.4`. Premium 8,600. PDF by temporary link. | Source unavailable. | Not executed. | The page disagrees with itself. The live MCP `report` description says Fahrenheit. The MCP tools page says Celsius. | High. Documentation and cross-interface contract. Not a measured report. |
| `POST /v1/streetview` | Counted by the quickstart. Article not extracted. | Source unavailable. | Not executed. | The REST article is missing from this read. | High as a documentation gap. |
| `POST /v1/satellite` | Counted as a capability. Article not extracted. | Source unavailable. | Not executed. | Same gap. | High as a documentation gap. |
| Temperature Property Reports | Named in the introduction. | Source unavailable. | No route was found or called. | Documented name with no reviewed route. Not proof it is unimplemented. | Medium. |

## Explicit checks

| Check | Result |
| --- | --- |
| Documented but unimplemented | Not established. Property Reports and the two imagery routes have no reviewed server handler. They also were not called. |
| Implemented but undocumented | Not established from source. No extra REST route was discovered by calling the API. |
| Incorrect examples | Heatmap shape and the heat-intelligence unit are incorrect or contradictory on the pages. They were not submitted. |
| Missing validation rules | Server rules for coordinates, unknown fields, and dates were not visible. The routing page does publish coordinate bounds. The status route's two 401 texts are specific. |
| Inconsistent status codes | The live 401 and 404 match the quickstart table. The sample's extra status words were not returned. |
| Incorrect authentication instructions | The `api-key` header instruction matches the live missing-key error, which tells the caller to send that header. |
| Incorrect credit information | The environmental price matches the observed balance difference. The server did not print the charge. Failed-job charging was not tested. |
| Incorrect async description | The one environmental job was asynchronous, as the quickstart says. The other POST routes were not tested. |

## Finding

| ID | Component | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| API-004 | Completed `env_params` body | QA status file. Documented price 2,900. | A consumer can see the charge on the job, or the docs say the balance is the only receipt. | The job has no credit field. The balance moved by 2,900. | A caller cannot reconcile one request from its own response. | Medium | Confirmed for this job. Not an invoice. |

Server-side atomicity, duplicate protection, and pre-checks remain inference. They are not findings.
