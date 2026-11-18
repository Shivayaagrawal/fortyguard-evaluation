# Documentation second pass

18 November 2026, about 12:50 UTC. The documentation site answered. Nine pages returned article text. The Dashboard was not opened.

## Pages

| Page | This pass |
| --- | --- |
| `/docs/introduction` | Rendered. Plans listed: BOTH, BASIC, PREMIUM. Startup is not in that list. Temperature Property Reports is named and has no path on this page. |
| `/docs/quickstart` | Rendered. Six POST routes plus `GET /v1/status/{activity_id}`. Header `api-key`. Credits move on `Completed`. The status table lists Processing, Completed, and Failed. The sample also accepts `succeeded` and `error`. The heatmap example is a FeatureCollection. |
| `/docs/authentication` | Rendered. Same `api-key` header. The heatmap example is again a FeatureCollection. |
| `/docs/create-heatmap` | Rendered. `POST /v1/heatmap`. Basic 10 mi², Premium 50 mi². Cost 3,500 Basic/Startup, 4,220 Premium. The example is a bare Polygon. `filter_type` 1–4. Granularity includes 20. |
| `/docs/environmental-parameters` | Rendered. `POST /v1/env_params`. Temperature is Celsius. Cost 2,110 Basic/Startup, 2,900 Premium. `filter_type` 1–3 only. Omit `analysis` for the full Premium set. |
| `/docs/heat-intelligence` | Rendered. `POST /v1/heat_intelligence`. Premium, 8,600. The temperature field says Fahrenheit. The date field says the date is for a Celsius temperature. The example sends `82.4`. Completed result is `data.result.download_link`. |
| `/docs/routing` | Rendered. `POST /v1/routing`. Premium, 3,500. Origin, destination, ISO-8601 `departure_time`. Straight-line cap 200 km. |
| `/docs/mcp-overview` | Rendered. Async pairs are heatmap, report, and temperature routing. Clients named: Codex, Cursor, Claude. |
| `/docs/mcp-tools` | Rendered. Nine tools. `env_params`, `satellite`, and `streetview` are described as direct. `report.temperature` is Celsius. `heatmap_read` is documented as `heatmap_id`, with example `hm_123`. `report_read` says `activity_id` is an accepted alias. |
| `/docs/streetview` and `/docs/satellite` | HTTP 200 application shells. This reader did not extract an article. Their MCP contracts were read on the tools page. |

## Discrepancies still on the current pages

- Report temperature: REST field says Fahrenheit, the date sentence says Celsius, the example is `82.4`, and the MCP tools page says Celsius.
- Heatmap shape: quickstart and authentication use a FeatureCollection. The heatmap page uses a Polygon.
- Status words: the table and the quickstart sample do not use the same set.
- Plan labels: introduction omits Startup. The heatmap and environmental credit lines include it.
- Identifiers: REST examples use `activity_id`. The MCP heatmap read example uses `hm_123`.
- `filter_type` 4 is on the heatmap page and not on the environmental-parameters page.
- Temperature Property Reports is named and not given an endpoint.

No earlier discrepancy checked on these rendered pages was found to be removed.
