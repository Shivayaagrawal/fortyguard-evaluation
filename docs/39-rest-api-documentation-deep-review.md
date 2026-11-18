# REST API documentation deep review

18 November 2026. Pages were read from the rendered documentation site. No paid request was sent. This note reviews the published contract. It does not review FortyGuard's server, because that source is not in this repository. See `docs/40-rest-api-server-architecture-review.md`.

## Pages read

| Page | Result |
| --- | --- |
| `/docs/introduction` | Rendered. Plan labels are BOTH, BASIC, and PREMIUM. Startup is absent. Temperature Property Reports is named and has no route. |
| `/docs/quickstart` | Rendered. Header `api-key`. Six POST endpoints are claimed. Every POST is described as returning `data.activity_id`. Status words and the sample do not match. The heatmap example is a FeatureCollection. |
| `/docs/authentication` | Rendered. Same header. No OAuth. The example is another FeatureCollection heatmap. |
| `/docs/create-heatmap` | Rendered. `POST /v1/heatmap`. |
| `/docs/environmental-parameters` | Rendered. `POST /v1/env_params`. |
| `/docs/heat-intelligence` | Rendered. `POST /v1/heat_intelligence`. |
| `/docs/routing` | Rendered. `POST /v1/routing`. |
| `/docs/streetview` and `/docs/satellite` | HTTP shells with no extracted article. |

No separate error-reference page was found. The status and error table is on the quickstart.

## Endpoint inventory

Authentication for every route below is the `api-key` header. The quickstart error table is the only shared status list: 400 or 422, 401, 403, 404, 429, 500, plus activity words Processing, Completed, and Failed. The sample also treats `succeeded` and `error` as terminal. Credits are documented as deducted only when status becomes Completed. The live error body observed on the status route is `error`, `status_code`, and `details.message`. The quickstart does not show that envelope.

| Route | Purpose and workflow | Required | Optional | Async | Credits | Limits |
| --- | --- | --- | --- | --- | --- | --- |
| `POST /v1/heatmap` | Area heatmap. Submit, then `GET /v1/status/{activity_id}`. | `polygon_aoi`, `date_time.start_date`, `date_time.filter_type` | `granularity` 20, 60, 80, 100. `analytic_type`, `threshold`, `direction`, times and `end_date` by filter. | Yes. Result is map data and stats, or links when `result_delivery=links`. | 3,500 Basic/Startup. 4,220 Premium. | Basic 10 mi². Premium 50 mi². `filter_type` 4 is at most one month. |
| `POST /v1/env_params` | Point environment. Same activity workflow. | `latitude`, `longitude`, Celsius `temperature`, `date_time` | `analysis`. Omit it for the full set. | Yes. Completed body has `metadata`, `locations`, parameters, and solar irradiance. | 2,110 Basic/Startup. 2,900 Premium. | Basic/Startup: 3 analysis names. Premium: full set. `filter_type` 1–3 only. |
| `GET /v1/status/{activity_id}` | Poll any activity. | The id in the path and the API key. | `result_delivery=links` is described for large heatmaps. | Read. | Not separately priced. Deduction is tied to Completed. | 404 means missing, or temporarily unavailable just after submit. |
| `POST /v1/routing` | Driving routes. Submit, poll, then read the result or the failure. | `origin.lat`, `origin.lon`, `destination.lat`, `destination.lon`, ISO-8601 `departure_time` | None listed. | Yes. | 3,500 Premium. | Premium only. Straight-line cap 200 km. Coordinates are bounded. Origin and destination must differ. |
| `POST /v1/heat_intelligence` | PDF report. Poll until Completed, then download `data.result.download_link`. | `latitude`, `longitude`, `temperature`, `date`, `analysis` | None listed. | Yes. The status body is JSON, not the PDF. | 8,600 Premium. | Premium only. The link is temporary. |
| `POST /v1/streetview` | Named by the quickstart. The article did not render. | Not extracted. The MCP page lists latitude, longitude, both angles, and `back_view`. | Not extracted. | The quickstart says every POST returns an activity id. The MCP page calls the tool direct. | Not on an extracted REST page. The live MCP text says 8,600 Premium. | Article missing from this read. |
| `POST /v1/satellite` | Named by the introduction's imagery capability. The article did not render. | Not extracted. The MCP page requires `date_time` and a point or tiles. | Not extracted. | Same conflict as street view. | Not on an extracted REST page. The live MCP text says 14,400 Premium. | Article missing from this read. |

The heatmap example on its own page is a bare Polygon. The quickstart and authentication examples are FeatureCollections. The heat-intelligence temperature field says Fahrenheit. The date field says the date is for a Celsius temperature. The example sends `82.4`.

## Findings

| ID | What | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| DOC-002 | `POST /v1/heat_intelligence` temperature | One unit in the field, the date sentence, and the example. | Fahrenheit, then Celsius, example `82.4`. | An 8,600-credit report can be requested at the wrong physical temperature. | High | Confirmed on the rendered page. The call was not sent. |
| DOC-003 | Heatmap GeoJSON | One shape, or an explicit list of accepted shapes. | FeatureCollection in the quickstart and authentication. Bare Polygon on the heatmap page. | The first copied example disagrees with the endpoint page. | Medium | Confirmed on the pages. Neither example was sent. |
| DOC-007 | Temperature Property Reports | A route, or no product name. | Named in the introduction. Absent from the seven-route inventory. | A reader looks for an endpoint that this review cannot find. | Medium | Confirmed as a documentation gap. Not proof the server lacks the route. |
| DOC-008 | Status words | The table and the sample use one set. | Table: Processing, Completed, Failed. Sample also accepts `succeeded` and `error`. | A client can treat a real status as still running, or accept a word the server never sends. The live completed word was `Completed`. | Medium | Confirmed in the quickstart. Runtime coverage is one success word. |
| DOC-009 | Plan labels | Startup appears wherever its price appears. | Introduction labels omit Startup. Heatmap and environmental prices include it. | A Startup reader cannot tell which label applies. | Low | Confirmed on the pages. |
| DOC-016 | Street View and satellite REST articles | An endpoint page for each route the quickstart counts. | Both slugs returned an application shell and no article. | Those two contracts cannot be followed from the REST docs. | High | Confirmed for this reader. It does not prove the pages do not exist in the app. |

The completed environmental job matches the documented result shape: timezone metadata, one location, unit-bearing parameter names, and solar irradiance. That agreement is one runtime sample, not a server-code review. Evidence: `evidence/qa-audit/rest-api/2026-11-18T13-13-19-116Z-status-known-activity.json`.
