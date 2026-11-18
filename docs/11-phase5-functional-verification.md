# Phase 5 — functional verification and cross-product assessment

18 November 2026. No new paid processing call. No heatmap, report, routing, imagery, or street-view execution. No MCP reinitialization. No account setting was changed. No feedback was submitted. The form was not submitted. Ratings stay blank.

The comparison uses the saved environmental-parameters response, the saved `tools/list`, and the dashboard observations. Original diagnostic and response files were not rewritten.

## A. Dashboard

Detail: `evidence/dashboard/observations/2026-11-18-phase5-dashboard.md`.

Confirmed:

- Feature Updates lists v1.1.1, v1.1.0, v1.0.7, and v1.0.4. The selected version was v1.1.1. The three groups advertise 4, 2, and 4 updates. The update text was not visible.
- The Alabama popup at `32.608763, -86.680695` shows coordinates plus Satellite View and Street View, and no temperature. An earlier tile at a different coordinate showed `60.59°F`. The missing temperature is not called a bug.
- Zoom, the basemap switch, search, Settings, and Feedbacks were visible or previously located, and were not exercised.
- The map URL later showed only `misdirected request to "dashboard.fortyguard.com"`. Screenshot: `evidence/dashboard/screenshots/dash-006-map-misdirected-request.png`.

Not confirmed: that the feature groups fail to expand, that map clicks outside the existing pin are ignored, or that the coordinate popup is supposed to include a temperature.

## B. REST environmental parameters

Request: `evidence/api/responses/2026-11-18-env-params.json`. Completed body: `evidence/api/responses/2026-11-18-env-params-status.json`.

| Check | Result |
| --- | --- |
| Job | `98a664cb-d9bb-484c-82a1-3d23ed9c7365`. Submit message "Environment Parameters Analysis Submitted Successfully". Status message and `data.status` are both `Completed`. |
| Coordinates | Request `33.4484, -112.074`. Result `lat` and `lon` are the same values. |
| Input temperature | `35` is echoed on the location. The result does not name the unit of that echoed value. Derived fields are named `heat_index_celsius`, `apparent_temperature_celsius`, and `wet_bulb_temperature_celsius`. |
| Timezone | `America/Phoenix`, offset `-7`. The timestamp is `2025-09-20T14:00:00-07:00`. Phoenix does not use daylight-saving time, so `-7` is the correct offset for that date. The request sent `14:00` with no zone, and the service inferred the zone from the coordinate. |
| Timestamp shape | One ISO-8601 timestamp with a numeric offset. `start` and `end` are equal. `interval` is `1h` and `count` is `1`, which matches `filter_type` 1. |
| Units in field names | Humidity is `relative_humidity_percent` (`24.9`). Precipitation is `precipitation_mm` (`0`). Cloud cover is `cloud_cover_octas` (`3`). Methane is `methane_ppb`. CO2 is `co2_ppm`. Air-quality fields use `idx` or `aqi_us_co`. |
| Solar | `clear_sky.ghi` `771.64`, `dni` `878.82`, `dhi` `98.77`. The description says modeled clear-sky W/m² for that location and time. |
| Elevation | `333` on the location object, not inside `parameters`. |
| Completeness | A developer can read the location, the time range, and the returned series without another request. The body has no credit cost, no plan, and no echo of `filter_type`. |
| Nulls | No field in this result was `null`, and none used `-999`. The documented null rule was not exercised by this one completed hour. |

Credit evidence, not a field in the job body:

| Reading | Value |
| --- | --- |
| Before | 1,000,000. `evidence/mcp/executions/2026-11-18-credit-balance-before.json` |
| After | 997,100. `evidence/mcp/executions/2026-11-18-credit-balance.json` |
| Difference | 2,900 |
| Plan on the free read | `premium` |
| Documented Premium cost for this endpoint | 2,900 |
| Cost of the `credit_balance` call itself | 0 |

The observed charge matches the Premium price. The job response does not say so. The balance change does.

### Local invalid-input checks

`npm test` on 18 November 2026: 24 passed. The local contract rejects a missing temperature, latitude `91`, a heatmap ring that cannot close, a MultiPolygon, an acceptance body with no `activity_id`, and the status word `queued`. These are fixtures. They do not prove the server rejects the same bodies. No rejected POST was sent.

## C. Live MCP catalogue

Source: `evidence/mcp/tool-discovery/2026-11-17-tools-list.json`. Eleven tools. The documented nine are all present. The two additions are `credit_balance` and `monitoring`. No processing tool was called.

| Tool | Required input | Cost stated on the tool | This evaluation |
| --- | --- | --- | --- |
| `credit_balance` | None | Free, read-only | Called. Balance 1,000,000, then 997,100. Cost 0. Plan `premium`. |
| `monitoring` | `operation` | `list_monitors` and `list_alerts` free. Every other operation 3,500 on Premium. | Not called. Operations include create, update, delete, forecast, alerts, runs, and `delete_heatmap_data`. |
| `env_params` | `latitude`, `longitude`, `temperature`, `date_time` | 2,110 Basic/Startup, 2,900 Premium/hackathon | Not called through MCP. Temperature must be Celsius. The description says not to invent it. |
| `heatmap` | `polygon_aoi`, `date_time` | 3,500 Free/Basic/Startup, 4,220 Premium/hackathon | Not called. Accepts a Polygon, a Feature, or a FeatureCollection. `idempotency_key` is an optional field. `map_type` is described as accepted and ignored. |
| `heatmap_read` | None in the schema | Not stated | Not called. `activity_id` or `heatmap_id`. |
| `report` | `latitude`, `longitude`, `temperature`, `date`, `analysis` | 6,300 Free, 8,600 Premium | Not called. Temperature is described as degrees Fahrenheit. Premium is described as at most two analysis types. |
| `report_read` | `analytics_id` | Not stated | Not called. The description says `activity_id` is an alias. The schema has no `activity_id` property, and `additionalProperties` is false. |
| `satellite` | `date_time` | 14,400 Premium | Not called. The description says MCP omits embedded images. |
| `streetview` | `latitude`, `longitude`, `vertical_angle`, `horizontal_angle`, `back_view` | 8,600 Premium/hackathon | Not called. `vertical_angle` is heading. `horizontal_angle` is pitch, and the description says the engine divides it by 100. |
| `temperature_routing` | `origin`, `destination`, `departure_time` | 3,500 on all entitled plans | Not called. Driving network only. Contiguous United States only. |
| `temperature_routing_read` | `activity_id` | Not stated | Not called. The required field is `activity_id`. |

`monitoring` is the larger of the two undocumented tools. Its free operations are only `list_monitors` and `list_alerts`. The schema also exposes delete and forecast operations at 3,500 credits. None were called.

## D. Cross-product comparison

### 1. Parameter names

REST `POST /v1/env_params` and MCP `env_params` use the same four required names: `latitude`, `longitude`, `temperature`, and `date_time`. Both describe the environmental temperature as Celsius. The completed REST job omitted `analysis` and returned the full series, which matches the Premium "omit analysis for the full set" rule.

The live MCP `date_time` description includes `filter_type` 4, a date range of at most one month. The environmental-parameters page reviewed for this evaluation documented types 1, 2, and 3.

Routing names differ. REST documents `POST /v1/routing`. MCP names the tools `temperature_routing` and `temperature_routing_read`.

### 2. Response shape

The completed REST job is an envelope: `error`, `status_code`, `message`, then `data.activity_id`, `data.status`, and `data.result`. The result has `metadata`, `locations[]`, `parameters` as arrays, and `solar_irradiance`.

MCP `credit_balance` returned MCP content plus `structuredContent.available_credits`, and a trace with `plan_type`, `cost_credits`, and `latency_ms`. That trace is not in the REST job body. The other ten MCP response bodies were not observed. `env_params`, `satellite`, and `streetview` do not say they return `activity_id`. `heatmap`, `report`, and `temperature_routing` do. Whether MCP `env_params` is direct remains a hypothesis.

### 3. Documentation versus the completed API job

The completed job agrees with the environmental-parameters contract on coordinates, Phoenix offset, ISO timestamps, Celsius field names, percent, millimetres, octas, and W/m². The Premium charge of 2,900 agrees with the price table. The job body does not repeat the price.

`elevation` came back on the location. It was not one of the parameter arrays.

### 4. Published catalogue versus live catalogue

Published pages name nine tools. The live list has those nine plus `credit_balance` and `monitoring`.

DOC-002, updated from the live schema: `report.temperature` is described as degrees Fahrenheit. The published MCP tools page reviewed earlier describes that temperature as Celsius. The REST Heat Intelligence page describes the temperature field as Fahrenheit, describes the date as applying to a Celsius temperature, and uses the example `82.4`. The server's enforced unit is still untested. No report was submitted.

DOC-003, schema only: live `heatmap.polygon_aoi` accepts a Polygon, a Feature, or a FeatureCollection. Which of those the server executes is untested.

API-001, schema only: `temperature_routing_read` requires `activity_id`. `heatmap_read` accepts `activity_id` or `heatmap_id` and requires neither in the schema. `report_read` requires `analytics_id`. Its alias claim is a sentence on that field, not a second property.

The street-view schema is more specific than a pan/tilt pair: heading is `vertical_angle`, and `horizontal_angle` is divided by 100 before it is sent as pitch. That behaviour was not executed.

`heatmap` documents an optional `idempotency_key`. The earlier note that no idempotency key exists is outdated for this MCP tool. REST still has no observed idempotency field.

### 5. Credit transparency

| Surface | What it showed |
| --- | --- |
| Dashboard | No balance and no per-action price on the map, the popup, or Feature Updates. |
| REST job | No cost field. The balance drop of 2,900 was observed by a separate MCP read and matches the Premium table. |
| MCP tool text | `env_params`, `heatmap`, `report`, `satellite`, `streetview`, `temperature_routing`, and `monitoring` state a price and tell the client to confirm before a paid call. |
| MCP `credit_balance` | Returns the balance, the plan, and `cost_credits: 0` for the read. |

The processing tools are explicit before a call. The completed REST result is not explicit after a call.

## Confirmed, and not yet confirmed

Confirmed: one completed environmental-parameters job, exact coordinates, Phoenix `-07:00`, unit-bearing field names, a 2,900 Premium charge, eleven live tools, `credit_balance` at cost 0, `temperature_routing_read` requiring `activity_id`, and the live report description saying Fahrenheit.

Not confirmed: report-unit enforcement, the `report_read` alias, MCP `env_params` response shape, any dashboard setting or feedback screen, the meaning of the Alabama popup, and the cause of either the earlier HTTP 503 or the later `misdirected request` page.
