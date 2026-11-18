# Product readiness matrix

18 November 2026. Readiness here means what a hiring reviewer can rely on. It is separate from the assigned evaluation scope, which stays complete for documentation and free checks.

| Surface | Assigned evaluation | What actually ran | Current confirmation | Known limit |
| --- | --- | --- | --- | --- |
| Dashboard | Closed, partially blocked | Login failure, one Alabama demo, one popup, version labels, then a gateway page | Not retested. Not currently confirmed up. | Settings, Feedbacks, zoom, basemap, second location, and release notes were not used and are not defects. |
| REST API | Complete at the assigned scope | Status route, four requests. One earlier env_params job, reread today. | Status and that job respond. | Five processing routes were not executed. Full API health is not established. |
| API documentation | Complete | Nine articles. Heatmap and heat intelligence were read again this audit. | The unit conflict and the bare Polygon example are still on the pages. | Street View and satellite REST articles were not extracted. |
| MCP | Complete at the assigned scope | Handshake, 11 tools, `credit_balance`. | Those free steps responded at 13:13 UTC. FortyGuard 4.0.11. Cost 0. | Ten tools were not executed. The earlier HTTP 503 remains historical. |
| MCP documentation | Complete | Published nine-tool page read again. | It still omits `credit_balance` and `monitoring`, and it still says the report temperature is Celsius. | The live schema says Fahrenheit. |

## What is confirmed working

- `GET /v1/status/{activity_id}` rejects a missing key, rejects an invalid key, rejects an unknown id, and returns the completed environmental job.
- That job still carries the submitted coordinate, elevation, temperature, Phoenix timezone, and offset.
- MCP Streamable HTTP connects, lists 11 tools, and `credit_balance` returns 997,100 on the Premium plan at no cost.
- Local contract fixtures and the TypeScript check pass.

## What remains unverified

- Heatmap, routing, heat intelligence, street view, and satellite, on REST and on MCP.
- A new environmental-parameters request. The documented Premium cost is 2,900.
- `heatmap_read`, `report_read`, `temperature_routing_read`, and every `monitoring` operation.
- Whether REST and MCP bill the same work once or twice.
- Dashboard availability after the misdirected-request page.
- The cause of the earlier MCP HTTP 503.
- The temperature unit a report would store.
- Whether `activity_id` is accepted by `report_read` at runtime. The schema does not define it.

## Defects, documentation conflicts, and coverage gaps

Confirmed product or availability issues:

- The login URL showed `upstream request timeout`.
- `/map` showed `misdirected request to "dashboard.fortyguard.com"`.
- One MCP handshake returned HTTP 503 after a successful initialize. A later handshake succeeded.
- The completed REST job does not report the credits charged.
- `report_read` describes an `activity_id` alias that its schema does not accept.

Documentation conflicts, still present:

- Report temperature unit.
- Heatmap GeoJSON shape across quickstart and the heatmap page.
- Nine published tools and eleven live tools.
- REST asynchronous env_params versus the MCP page calling `env_params` direct. The MCP tool was not called.
- Temperature Property Reports is named in the introduction and has no route in the seven-route inventory.

Coverage gaps, not defects:

- Five paid REST routes.
- Ten MCP tools.
- Dashboard controls that never received input.

## Submission

The written package can be reviewed. It cannot be described as full end-to-end verification. The Google Form is still not ready to submit: name, email, position, and time spent are empty, and the four ratings remain `NO DEFENSIBLE SCORE`. The clarification email is still a draft.
