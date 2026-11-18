# Indexed documentation excerpts — 17 November 2026

The pages below did not render. `https://docs-api.fortyguard.com/docs/introduction` returned HTTP 504, `upstream request timeout`. The quotations are from the search index of those URLs, collected the same day. Re-read the live pages before promoting any item from documentation gap to runtime defect.

## DOC-002 — Heat Intelligence temperature

REST page `https://docs-api.fortyguard.com/docs/heat-intelligence`:

- Temperature attribute: "Temperature value in degrees Fahrenheit for the location."
- Date attribute: "Date for the supplied Celsius temperature in YYYY-MM-DD format."
- Example temperature: `82.4`.

MCP page `https://docs-api.fortyguard.com/docs/mcp-tools`, `report` tool:

- Temperature: "Reference temperature in degrees Celsius."

## DOC-003 — Heatmap area shape

`https://docs-api.fortyguard.com/docs/authentication` and `https://docs-api.fortyguard.com/docs/quickstart` show `polygon_aoi` as a GeoJSON FeatureCollection containing one Polygon feature.

`https://docs-api.fortyguard.com/docs/create-heatmap` shows `polygon_aoi` as a bare Polygon. Both use a lower-Manhattan ring, `start_date` `2024-07-15`, `start_time` `14:00`, `filter_type` 1, and `granularity` 100.

## API-001 — Identifiers

REST quickstart and status page use `activity_id`. A Heat Intelligence polling example uses `f3e1c68b-1cc3-46bc-8589-1faaf30ef30a`.

MCP `heatmap_read` input is `heatmap_id`. The example in the excerpt is `hm_123`.

MCP `report_read` input is `analytics_id`. The excerpt says the tool also accepts that identifier as `activity_id`.

The `temperature_routing_read` parameter name was cut off in the excerpt. It is unknown until `tools/list`.
