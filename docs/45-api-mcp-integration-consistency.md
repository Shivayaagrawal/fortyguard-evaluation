# API and MCP integration consistency

18 November 2026. This comparison uses published pages, live MCP schemas, and the one REST workflow that was executed. It does not show whether the MCP server calls the REST handlers or a shared service. That call path is inside server source this repository does not contain.

No paid API route and no paid MCP tool were called.

## Side-by-side

| Capability | REST | MCP | Same validation | Same identifier | Same unit | Credits | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Environmental parameters | `POST /v1/env_params`, then status. Celsius. | `env_params`, documented as direct. Celsius in the live description. | Both require latitude, longitude, temperature, and `date_time`. Server equality is unavailable. | REST returns `activity_id`. The MCP page does not say it returns one. | Celsius on both environmental texts. | 2,110 or 2,900 on both the REST page and the live tool text. | REST job completed. MCP tool not called. |
| Heatmap | `POST /v1/heatmap`, then status. | `heatmap`, then `heatmap_read`. | Live MCP schema accepts three GeoJSON shapes and has `idempotency_key`. The REST page shows one shape and no idempotency field. | REST `activity_id`. MCP read accepts `activity_id` or `heatmap_id`, and requires neither. | Celsius in the heatmap analytic notes. | 3,500 or 4,220 on both. | Neither interface executed. |
| Heat Intelligence | `POST /v1/heat_intelligence`. Page says Fahrenheit and Celsius. | `report`, then `report_read`. Page says Celsius. Live schema says Fahrenheit. | REST example has one analysis and no stated maximum. Live MCP text says at most two on Premium. The tools page says one to five. | REST `activity_id`. MCP read requires `analytics_id` and does not define `activity_id`. | Not the same text. | REST 8,600 Premium. Live MCP also says 6,300 on free. | Neither executed. |
| Routing | `POST /v1/routing`, then status. | `temperature_routing`, then `temperature_routing_read`. | Both require origin, destination, and departure time. The 200 km cap is on the REST page. It was not restated in the QA digest. | Both use `activity_id` on the read side. The MCP page omits the field name. | Not a temperature input. | 3,500 on both. | Neither executed. |
| Street View | REST article not extracted. Quickstart says the POST is an activity. | `streetview`, documented as direct. | Cannot compare REST field rules. The published angle sentence and the saved live schema do not use the same meanings. | Unknown on REST. | Not applicable. | Live text 8,600. No extracted REST price. | Not executed. |
| Satellite | REST article not extracted. | `satellite`, documented as direct. | Cannot compare REST field rules. | Unknown on REST. | Not applicable. | Live text 14,400. No extracted REST price. | Not executed. |
| Balance | No REST balance route in the reviewed inventory. | `credit_balance`. | Not shared. | Not shared. | Not applicable. | The call costs 0. | MCP only. Executed. |
| Monitoring | No REST route in the reviewed inventory. | `monitoring`, fourteen operations. | Not shared. | Uses `monitor_id`, `heatmap_id`, and other ids. | Not compared. | Two operations described as free. Others 3,500 Premium. | Not executed. |

## What the interfaces share in the evidence

The environmental result that REST returned uses the same unit-bearing names the environmental page lists, including `heat_index_celsius` and clear-sky irradiance. That is one completed REST body. It does not show an MCP transformation of the same body.

Authentication is intentionally different and documented: REST `api-key`, MCP Bearer, same account key. The live status error names the REST header. The successful MCP handshake shows the Bearer form works. A bad Bearer body was not collected in the QA run.

Error translation from REST status codes into MCP tool errors was not observed, because no MCP processing tool was called. The historical MCP HTTP 503 is a transport failure. It is not a tool error. The classifier distinction is in the evaluation client, not in server source.

## Duplication

Whether MCP is a thin interface over the API services or a second copy of the business rules cannot be decided. The contracts already disagree on the report unit, the report identifier, the environmental return style, and the report analysis maximum. Those are enough for a developer to send different requests to the two interfaces. They are not enough to say the server implements the rules twice.

## Finding

| ID | Component | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DOC-006 | `env_params` workflow | REST quickstart. MCP tools page. One REST job. | Both interfaces say whether the caller polls. | REST says poll. MCP says the tool returns the result. Only REST was executed, and it required a later status read. | A client can skip a poll the REST API requires, or poll an MCP call that might already be finished. | High | Confirmed as a documentation conflict. MCP runtime is inference. |
| SRC-001 | Shared service versus duplicated logic | No server source. | The call path is visible. | It is not. | No architectural grade is assigned. | Not a product defect. | Confirmed absence. |

## Separate judgments

| Question | Judgment |
| --- | --- |
| Documentation quality | The REST and MCP pages are detailed and often contradictory. The conflicts above are the quality result. |
| Implementation quality | Unavailable. No FortyGuard server source is in the repository. |
| Runtime correctness | Confirmed for the status route, one environmental job, MCP discovery, and `credit_balance`. Not established for the other tools or routes. |
| Developer experience | A developer can authenticate and poll the one completed job. The developer cannot follow the report unit, the report id, or the nine-tool catalogue without hitting a conflicting text. |
| Security and operations | The key was not printed. Paid and delete operations were not run. Server-side isolation and atomic billing were not reviewed. |
