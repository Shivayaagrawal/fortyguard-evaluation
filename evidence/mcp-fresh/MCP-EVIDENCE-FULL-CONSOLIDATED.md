# MCP evidence — full consolidated capture

18 November 2026. Full verbatim contents of the MCP evaluation documents and evidence for Cursor integration, discovery, and functional testing. Credentials remain redacted as in the source files.

Absolute base: `/Users/shivanyaagrawal/fourty/fortyguard-evaluation/`


# Section 1 — Evaluation documents


---

## docs/50-mcp-fresh-evaluation.md

Source path: `docs/50-mcp-fresh-evaluation.md`

# Fresh MCP evaluation

18 November 2026. Black-box test of `https://tos-mcp.app.fortyguard.com/mcp`. The server source was not inspected.

Client paths recorded separately:

1. **SDK path** — `@modelcontextprotocol/sdk` 1.32.2 discovery plus one safe `credit_balance` call.
2. **Cursor path** — env-correct relaunch, Phase C `credit_balance`, Phase D discovery, then free functional/error probes.

No paid heatmap, route, report, imagery, or destructive monitor operation was called. The Google Form was not submitted.

Evidence:

- SDK discovery: `evidence/mcp-fresh/2026-11-18-discovery.json`
- Docs capture: `evidence/mcp-fresh/documentation/`
- Cursor Phase C: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`
- Cursor Phase D: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`
- Complete Cursor evaluation: `evidence/mcp-fresh/complete-evaluation/`

## 1. Connection and authentication

### SDK (historical)

| Check | Result |
| --- | --- |
| Server | FortyGuard 4.0.11 |
| Protocol | `2025-11-25` |
| Initialize POST | HTTP 200 in 1,691 ms |
| Following POST | HTTP 202 in 2,685 ms |
| Following GET | HTTP 405 in 853 ms |
| `tools/list` POST | HTTP 200 in 1,103 ms |
| `credit_balance` POST | HTTP 200 in 1,812 ms |
| Discovery, including the balance call | 5,843 ms |

An earlier same-day handshake had returned HTTP 503 after initialize. That failure was not reproduced in the successful SDK session or later Cursor session.

### Cursor setup and Phase C

Initial Cursor attempt failed with HTTP 401 `invalid_token` because `FORTYGUARD_API_KEY` was not in the Cursor process environment. After quitting and relaunching from a shell that sourced `.env` and exported the key, `user-fortyguard` connected.

Phase C `credit_balance` through Cursor MCP:

- Succeeded (`ok`, `decision: allow`)
- Plan: `premium`
- Available credits: `994200`
- Cost: `0`
- Trace: `f0854581c856`
- Latency: 1095 ms

`mcp.json` was not modified.

## 2. Documented tools versus live tools (Phase D)

| Client discovery | FortyGuard tools | Notes |
| --- | --- | --- |
| Published docs | 9 | Omits `credit_balance` and `monitoring` |
| SDK `tools/list` | 11 | Includes the two undocumented tools |
| Cursor Phase D listing | 12 namespace / 11 FortyGuard | Same 11; Cursor also surfaces `mcp_auth` |

**Historical 9-versus-11 discrepancy still holds.**

Confirmed schema/doc mismatches remain: report °C vs °F; analysis 1–5 vs Premium ≤2 vs `maxItems` 5; Street View angle semantics; missing `wait_for_completion`; monitoring undocumented; credit prices only in live text; `heatmap_read` dual IDs.

## 3. Safe / free functional tests (Cursor)

| Tool | Purpose | Status | Cost | Trace |
| --- | --- | --- | --- | --- |
| `credit_balance` | Free baseline (Phase C) | success | 0 | `f0854581c856` |
| `monitoring` / `list_monitors` | Free list | success (empty list) | 0 | `f60562e03d46` |
| `monitoring` / `list_alerts` | Free list claim | `invalid_input` | uncharged | `f31125965e3c` |
| `monitoring` / `list_alerts` + limit | Retry | `invalid_input` | uncharged | `26fea41f029c` |
| `heatmap_read` invalid id | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `32dba26040eb` |
| `report_read` invalid `analytics_id` | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `1122fa0dba22` |
| `report_read` with `activity_id` only | Alias probe | `ACTIVITY_UNAVAILABLE` (accepted) | n/a | `f45557797baa` |
| `temperature_routing_read` invalid id | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `6509fec48549` |
| `heatmap_read` empty | Validation | `INVALID_ACTIVITY_ID` | n/a | `375cc5dcc562` |
| `monitoring` empty | Validation | `invalid_input` field=operation | n/a | `621f5af382a4` |

Credits spent in this Cursor functional pass: **0**.

Runtime update: `report_read` accepts `activity_id` at runtime despite the schema omitting that property and setting `additionalProperties: false`.

## 4. Paid approval gate (not executed)

Primary candidate:

- Tool: `env_params`
- Purpose: resolve DIRECT vs activity-id behaviour
- Expected cost: 2,900 premium credits
- Balance (Phase C): 994,200
- Status: awaiting explicit approval

Not executed without approval: `heatmap`, `report`, `satellite`, `streetview`, `temperature_routing`, and paid/destructive monitoring operations (`create_monitor`, `update_monitor`, `delete_monitor`, `delete_heatmap_data`, `trigger_forecast`, etc.).

## 5. Usability assessment

- Connecting Cursor works after exporting the API key in the launch shell; project `.env` alone is insufficient for remote HTTP MCP.
- Tool naming and free-tool traces are clear; credit costs in live descriptions help agents.
- Documentation lag and the free/destructive mix inside `monitoring` hurt agent safety.
- Invalid-ID denials are understandable; `list_alerts` free claim is currently broken/incomplete.

## 6. Rating

**Cursor MCP rating: 7 / 10**

Setup friction, documentation mismatches, and the broken `list_alerts` free path keep it below 8–9. Verified Cursor auth recovery, discovery, free execution, and clear read-tool errors support a solid 7 without claiming paid analysis success.

## 7. Recommendations

1. Publish the live 11-tool list and mark free vs paid monitoring operations. Priority: High.
2. One report temperature unit; reconcile Premium analysis limit with schema. Priority: High.
3. Put `activity_id` on the `report_read` schema; fix/document `list_alerts` inputs; align Street View angle docs; remove or implement `wait_for_completion`. Priority: High.
4. Document that Cursor must be launched with `FORTYGUARD_API_KEY` exported. Priority: Medium.

## 8. Form readiness

Draft MCP answers: `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md` and `docs/51-mcp-google-form-answers.md`.

Google Form: **not submitted**. Paid analysis remains optional for stronger coverage.


---

## docs/51-mcp-google-form-answers.md

Source path: `docs/51-mcp-google-form-answers.md`

# MCP answers for the Google Form

18 November 2026. **NOT SUBMITTED.** Matches `docs/50-mcp-fresh-evaluation.md` and `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md`.

## Did you try the MCP? How did you set it up and which client did you use?

Yes. Primary client for this pass: **Cursor**.

FortyGuard was configured in `~/.cursor/mcp.json` as a remote Streamable HTTP MCP server at `https://tos-mcp.app.fortyguard.com/mcp`, authenticating with `Authorization: Bearer ${env:FORTYGUARD_API_KEY}` and no hardcoded key. An earlier `@modelcontextprotocol/sdk` 1.32.2 session had already listed 11 tools and called `credit_balance` once; this answer focuses on the Cursor integration.

The first Cursor launch failed with HTTP 401 `invalid_token` because the Cursor process did not inherit `FORTYGUARD_API_KEY` from the project `.env`. After quitting Cursor and relaunching from a shell that sourced `.env` and exported the key, the `user-fortyguard` namespace connected.

Through Cursor MCP I:

- Called `credit_balance` (Premium, 994,200 credits, cost 0).
- Discovered 12 namespace tools / 11 FortyGuard tools (published docs still list 9).
- Called free `monitoring.list_monitors` (empty list, cost 0).
- Probed `heatmap_read`, `report_read`, and `temperature_routing_read` error paths.

No paid analysis tools and no destructive monitoring operations were executed.

## How would you rate the MCP experience (1–10)?

**7**

Setup works in Cursor after the environment variable is exported in the launch shell, free tools execute reliably with clear traces, and invalid-ID errors are understandable. The score is held down by the easy-to-miss auth setup, documentation lag (9 published vs 11 live tools; report unit and Street View angle mismatches; missing `wait_for_completion`), and `list_alerts` being labeled free while returning `invalid_input`. Paid heat/route/imagery/report tools were not spent without approval, so this rating does not claim those paths were runtime-validated.

## Did you face any issues during setup or usage?

Yes.

1. Initial Cursor HTTP 401 `invalid_token` until relaunch with exported `FORTYGUARD_API_KEY`. Resolved; not persistent.
2. Published catalogue omits live `credit_balance` and `monitoring`.
3. `monitoring.list_alerts` described as free but failed with `invalid_input` (with and without `limit`).
4. Docs/schema mismatches: report °C vs live °F; Premium ≤2 analyses vs schema max 5; Street View heading/pitch vs docs viewing/pan; documented `wait_for_completion` absent live.
5. `report_read` schema omits `activity_id` and sets `additionalProperties: false`, but runtime accepts `activity_id` (alias claim is operationally true; schema contract is inaccurate).
6. Historical SDK handshake once returned HTTP 503 after initialize; not reproduced in the Cursor session.

## What improvements would you suggest for the MCP?

1. Publish the live 11-tool catalogue and mark which `monitoring` operations are free versus 3,500 credits, including destructive deletes.
2. Use one report temperature unit; reconcile Premium analysis limits with schema `maxItems`.
3. Add `activity_id` to the `report_read` schema; fix or document required inputs for `list_alerts`; align Street View angle semantics; remove or implement `wait_for_completion`; put live credit numbers on the tools page.
4. State clearly in Cursor setup docs that the API key must be exported in the same shell that launches Cursor.

## Overall MCP comments

FortyGuard MCP is usable from Cursor after correct environment setup. Free credit and monitor-list paths work, traces are informative, and invalid-ID errors are clear. The main gap is contract fidelity: agents cannot fully trust the published catalogue or several parameter descriptions without reading live schemas. Paid analysis tools remain intentionally unspent pending approval.


# Section 2 — Discovery and Cursor configuration evidence


---

## evidence/mcp-fresh/2026-11-18-discovery.json

Source path: `evidence/mcp-fresh/2026-11-18-discovery.json`

```json
{
  "at": "2026-11-18T16:23:10.101Z",
  "endpoint": "https://tos-mcp.app.fortyguard.com/mcp",
  "auth": "Authorization Bearer from the local environment",
  "sdk": "@modelcontextprotocol/sdk 1.32.2",
  "discoveryMs": 5843,
  "serverVersion": {
    "name": "FortyGuard",
    "version": "4.0.11"
  },
  "serverCapabilities": {
    "logging": {},
    "prompts": {
      "listChanged": true
    },
    "resources": {
      "subscribe": false,
      "listChanged": true
    },
    "tools": {
      "listChanged": true
    }
  },
  "sessionPresent": false,
  "httpLog": [
    {
      "at": "2026-11-18T16:23:01.031Z",
      "method": "POST",
      "status": 200,
      "contentType": "text/event-stream",
      "elapsedMs": 1691
    },
    {
      "at": "2026-11-18T16:23:03.729Z",
      "method": "POST",
      "status": 202,
      "contentType": "application/json",
      "elapsedMs": 2685
    },
    {
      "at": "2026-11-18T16:23:04.584Z",
      "method": "GET",
      "status": 405,
      "contentType": "text/plain; charset=utf-8",
      "elapsedMs": 853
    },
    {
      "at": "2026-11-18T16:23:04.836Z",
      "method": "POST",
      "status": 200,
      "contentType": "text/event-stream",
      "elapsedMs": 1103
    },
    {
      "at": "2026-11-18T16:23:06.946Z",
      "method": "POST",
      "status": 200,
      "contentType": "text/event-stream",
      "elapsedMs": 1812
    }
  ],
  "toolCount": 11,
  "names": [
    "credit_balance",
    "env_params",
    "heatmap",
    "heatmap_read",
    "monitoring",
    "report",
    "report_read",
    "satellite",
    "streetview",
    "temperature_routing",
    "temperature_routing_read"
  ],
  "invoked": [
    "credit_balance"
  ],
  "balanceSkippedReason": null,
  "balanceMs": 4967,
  "creditBalance": {
    "content": [
      {
        "type": "text",
        "text": "{\"ok\":true,\"result\":{\"tool\":\"credit_balance\",\"value\":{\"available_credits\":994200},\"evidence\":[],\"warnings\":[]},\"trace\":{\"trace_id\":\"ca7b5aeeef16\",\"tool\":\"credit_balance\",\"plan_type\":\"premium\",\"decision\":\"allow\",\"status\":\"ok\",\"latency_ms\":3330,\"cost_credits\":0}}"
      }
    ],
    "structuredContent": {
      "available_credits": 994200
    },
    "isError": false
  },
  "schemaDigest": [
    {
      "name": "credit_balance",
      "description": "Read your available Enterprise API credits; free and read-only.",
      "required": [],
      "additionalProperties": false,
      "properties": {}
    },
    {
      "name": "env_params",
      "description": "Point-level environmental conditions for a single coordinate and date — e.g. provider-sourced apparent temperature, wet-bulb temperature, humidity, precipitation, and AQI, plus modeled clear-sky solar irradiance estimates (GHI, DNI, and DHI in W/m²). Provide the location's temperature in Celsius, supplied by the user or obtained from a reliable source. If it is unavailable, ask the user; never invent, assume, or silently substitute a temperature. heat_index_celsius is derived from this temperature and provider-sourced relative humidity. Use for a single location's numeric values, not area-wide maps or written reports. Historical temperature requests start at 2021-01-01; provider availability varies by location, date, and parameter. Future dates are unsupported. Paid: 2,110 credits on basic/startup, 2,900 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "latitude",
        "longitude",
        "temperature",
        "date_time"
      ],
      "additionalProperties": null,
      "properties": {
        "heatmap_id": {
          "type": null,
          "description": "Existing Dashboard heatmap reference",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "latitude": {
          "type": "number",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": -90,
          "maximum": 90,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "longitude": {
          "type": "number",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": -180,
          "maximum": 180,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "temperature": {
          "type": "number",
          "description": "Caller-supplied reference temperature in degrees Celsius. Used with provider-sourced relative humidity to calculate heat_index_celsius.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "date_time": {
          "type": "object",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "analysis": {
          "type": null,
          "description": "Output fields to return; omitted uses the default set. Temperature fields are °C; humidity %, precipitation mm, cloud cover octas (0-8), elevation m, AQI fields US AQI index, methane ppb, CO2 ppm, and solar_irradiance clear-sky GHI/DNI/DHI in W/m².",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "items": {
                "description": "Environmental measurements available for selection.",
                "enum": [
                  "heat_index_celsius",
                  "apparent_temperature_celsius",
                  "wet_bulb_temperature_celsius",
                  "relative_humidity_percent",
                  "precipitation_mm",
                  "cloud_cover_octas",
                  "elevation_meters",
                  "aqi_us",
                  "aqi_us_pm25",
                  "aqi_us_pm10",
                  "aqi_us_no2",
                  "aqi_us_co",
                  "aqi_us_o3",
                  "aqi_us_so2",
                  "methane_ppb",
                  "co2_ppm",
                  "solar_irradiance"
                ],
                "title": "AnalysisField",
                "type": "string"
              },
              "type": "array"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        }
      }
    },
    {
      "name": "heatmap",
      "description": "Submit a standalone temperature or analytic heatmap for a polygon and local date window. start_time and end_time are HH:MM local wall times at the polygon AOI, not UTC; ambiguous or nonexistent DST times are rejected. A heatmap request can cover at most 31 calendar dates, counting both the start and end dates. For longer ranges, explain the limit and request approval before each separate paid submission. Exceedance counts sampled hours; persistence counts continuous sampled hours; thresholds are Celsius with strict above/below comparisons. Time of measure returns the maximum sample's UTC hour, using the earliest timestamp on ties. Returns status=processing and an activity_id immediately; use heatmap_read to retrieve the activity's processing, completed, or failed result. Historical temperature requests start at 2021-01-01; catalog availability varies by location and date. Paid: 3,500 credits on free/basic/startup, 4,220 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "polygon_aoi",
        "date_time"
      ],
      "additionalProperties": false,
      "properties": {
        "polygon_aoi": {
          "type": "object",
          "description": "Closed GeoJSON Polygon, Feature or FeatureCollection; longitude then latitude",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "date_time": {
          "type": "object",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "granularity": {
          "type": "integer",
          "description": "Heatmap output grid size in meters: 60, 80, or 100 (default 100). Smaller cells produce a finer map.",
          "enum": [
            60,
            80,
            100
          ],
          "default": 100,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "analytic_type": {
          "type": "string",
          "description": "tcm=temperature map (default); time_of_measure=peak temperature hour; exceedance=hours beyond threshold; persistence=continuous hours beyond threshold",
          "enum": [
            "tcm",
            "time_of_measure",
            "exceedance",
            "persistence"
          ],
          "default": "tcm",
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "threshold": {
          "type": null,
          "description": "Celsius; defaults to 30 for exceedance/persistence",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "number"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "direction": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "enum": [
                "above",
                "below"
              ],
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "idempotency_key": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 128,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "map_type": {
          "type": "string",
          "description": "Legacy Dashboard presentation code; accepted for compatibility but ignored by Enterprise/MCP heatmap execution. Use analytic_type to choose the analysis.",
          "enum": [
            "bm",
            "tcm",
            "tccm"
          ],
          "default": "bm",
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "notify_by_email": {
          "type": "boolean",
          "description": null,
          "enum": null,
          "default": false,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    },
    {
      "name": "heatmap_read",
      "description": "Read bounded persisted statistics from an existing temperature or analytic heatmap. Use for grounded questions about a heatmap already shown in Dashboard; does not create or modify a heatmap.",
      "required": [],
      "additionalProperties": null,
      "properties": {
        "activity_id": {
          "type": null,
          "description": "Activity ID returned by heatmap; provide this or heatmap_id",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "minLength": 1,
              "pattern": "^\\S+$",
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "heatmap_id": {
          "type": null,
          "description": "Compatibility alias for activity_id",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "minLength": 1,
              "pattern": "^\\S+$",
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        }
      }
    },
    {
      "name": "monitoring",
      "description": "Recurring temperature monitors of a heatmap: list, read, create, update, delete or run one now; read its latest run, its alerts and their reports. list_monitors and list_alerts are free. All other operations cost 3,500 credits on premium. For a paid operation, show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "operation"
      ],
      "additionalProperties": false,
      "properties": {
        "operation": {
          "type": "string",
          "description": null,
          "enum": [
            "create_monitor",
            "get_monitor",
            "list_monitors",
            "update_monitor",
            "delete_monitor",
            "get_latest_run",
            "trigger_forecast",
            "list_alerts",
            "get_alert",
            "get_alert_report",
            "download_alert_report",
            "list_runs",
            "get_run",
            "delete_heatmap_data"
          ],
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "monitor_id": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 256,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "alert_id": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 256,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "run_id": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 256,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "heatmap_id": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 256,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "name": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 120,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "boundary_geojson": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "additionalProperties": true,
              "type": "object"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "rules": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "items": {
                "additionalProperties": false,
                "properties": {
                  "temporal_aggregation": {
                    "enum": [
                      "minimum",
                      "average",
                      "maximum"
                    ],
                    "title": "Temporal Aggregation",
                    "type": "string"
                  },
                  "spatial_aggregation": {
                    "enum": [
                      "minimum",
                      "maximum"
                    ],
                    "title": "Spatial Aggregation",
                    "type": "string"
                  },
                  "operator": {
                    "enum": [
                      "above",
                      "below",
                      "within_interval"
                    ],
                    "title": "Operator",
                    "type": "string"
                  },
                  "unit": {
                    "enum": [
                      "celsius",
                      "fahrenheit"
                    ],
                    "title": "Unit",
                    "type": "string"
                  },
                  "threshold": {
                    "anyOf": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Threshold"
                  },
                  "lower_bound": {
                    "anyOf": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Lower Bound"
                  },
                  "upper_bound": {
                    "anyOf": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Upper Bound"
                  }
                },
                "required": [
                  "temporal_aggregation",
                  "spatial_aggregation",
                  "operator",
                  "unit"
                ],
                "title": "MonitorRuleInput",
                "type": "object"
              },
              "maxItems": 20,
              "minItems": 1,
              "type": "array"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "notifications": {
          "type": null,
          "description": "Required for create_monitor: include at least one email, sms, or whatsapp destination.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "additionalProperties": false,
              "properties": {
                "email": {
                  "items": {
                    "type": "string"
                  },
                  "maxItems": 20,
                  "title": "Email",
                  "type": "array"
                },
                "sms": {
                  "items": {
                    "type": "string"
                  },
                  "maxItems": 20,
                  "title": "Sms",
                  "type": "array"
                },
                "whatsapp": {
                  "items": {
                    "type": "string"
                  },
                  "maxItems": 20,
                  "title": "Whatsapp",
                  "type": "array"
                }
              },
              "title": "MonitorNotifications",
              "type": "object"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "enabled": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "generate_report": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "boolean"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "file_type": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "enum": [
                "pdf",
                "docx"
              ],
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "cursor": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 512,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "limit": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maximum": 100,
              "minimum": 1,
              "type": "integer"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "status": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 64,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        }
      }
    },
    {
      "name": "report",
      "description": "Submit a heat-intelligence report for a point and date. Provide the point temperature in degrees Fahrenheit (°F). Returns status=processing and an activity_id immediately; use report_read to retrieve the activity's processing, completed, or failed result. Premium permits at most 2 analysis types per report; select 1 or 2. Historical temperature requests start at 2021-01-01; historical weather and other source availability varies by location and date. Reports can take several minutes; poll report_read with the returned activity_id. Paid: 6,300 credits on free, 8,600 on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "latitude",
        "longitude",
        "temperature",
        "date",
        "analysis"
      ],
      "additionalProperties": null,
      "properties": {
        "heatmap_id": {
          "type": null,
          "description": "Existing Dashboard heatmap reference",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "polygon": {
          "type": null,
          "description": "Dashboard report area polygon",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "additionalProperties": true,
              "type": "object"
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "report_polygon": {
          "type": null,
          "description": "Explicit enriched Dashboard tile polygon",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "additionalProperties": true,
              "type": "object"
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "selected_heat_intelligence_tile_id": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "maxLength": 256,
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "date_time": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "properties": {
                "start_date": {
                  "description": "Start date in YYYY-MM-DD format",
                  "title": "Start Date",
                  "type": "string"
                },
                "end_date": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "End date in YYYY-MM-DD format",
                  "title": "End Date"
                },
                "start_time": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                  "title": "Start Time"
                },
                "end_time": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                  "title": "End Time"
                },
                "filter_type": {
                  "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                  "enum": [
                    1,
                    2,
                    3,
                    4
                  ],
                  "title": "Filter Type",
                  "type": "integer"
                }
              },
              "required": [
                "start_date",
                "filter_type"
              ],
              "title": "SegmentationDateTimeRange",
              "type": "object"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "granularity": {
          "type": "integer",
          "description": null,
          "enum": null,
          "default": 100,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "notify_by_email": {
          "type": "boolean",
          "description": null,
          "enum": null,
          "default": false,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "latitude": {
          "type": "number",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": -90,
          "maximum": 90,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "longitude": {
          "type": "number",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": -180,
          "maximum": 180,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "temperature": {
          "type": "number",
          "description": "Point temperature in degrees Fahrenheit (°F)",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "date": {
          "type": "string",
          "description": "YYYY-MM-DD, past or present only",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "analysis": {
          "type": "array",
          "description": "1-5 of: geographic, environmental, urban, events, anthropogenic. Enterprise Premium allows at most 2 per report.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": 1,
          "maxItems": 5,
          "anyOf": null,
          "items": {
            "enum": [
              "geographic",
              "environmental",
              "urban",
              "events",
              "anthropogenic"
            ],
            "title": "ReportAnalysis",
            "type": "string"
          }
        }
      }
    },
    {
      "name": "report_read",
      "description": "Read an existing completed Heat Intelligence report without generating a new report.",
      "required": [
        "analytics_id"
      ],
      "additionalProperties": false,
      "properties": {
        "heatmap_id": {
          "type": null,
          "description": "Dashboard heatmap context; required only for Dashboard reads.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "minLength": 1,
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "analytics_id": {
          "type": "string",
          "description": "Report activity identifier returned by report; activity_id is an accepted input alias.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    },
    {
      "name": "satellite",
      "description": "Segment a satellite image for a point into land-cover classes. Use for overhead imagery; use streetview for ground-level imagery. Shared accepts request dates from 2019-01-01; Enterprise's configured minimum may differ, and imagery availability varies by location and capture date. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 14,400 credits on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "date_time"
      ],
      "additionalProperties": null,
      "properties": {
        "heatmap_id": {
          "type": null,
          "description": "Existing Dashboard heatmap reference",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "tiles": {
          "type": null,
          "description": "Selected tile or polygon for Dashboard segmentation",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {},
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "big_area": {
          "type": "boolean",
          "description": "Dashboard polygon mode only; Enterprise/MCP point requests ignore this flag. Default false.",
          "enum": null,
          "default": false,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "sat": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "properties": {
                "latitude": {
                  "description": "Latitude in decimal degrees (-90 to 90)",
                  "maximum": 90,
                  "minimum": -90,
                  "title": "Latitude",
                  "type": "number"
                },
                "longitude": {
                  "description": "Longitude in decimal degrees (-180 to 180)",
                  "maximum": 180,
                  "minimum": -180,
                  "title": "Longitude",
                  "type": "number"
                }
              },
              "required": [
                "latitude",
                "longitude"
              ],
              "title": "SatellitePointInput",
              "type": "object"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "date_time": {
          "type": "object",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "granularity": {
          "type": "integer",
          "description": "Point imagery buffer radius in meters: 60, 80, or 100 (default 100).",
          "enum": [
            60,
            80,
            100
          ],
          "default": 100,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    },
    {
      "name": "streetview",
      "description": "Segment street-view imagery for a point into visible urban classes. Use for ground-level front/back views; use satellite for overhead imagery. Street View availability and image capture dates vary by location; a supplied date is not an imagery guarantee. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 8,600 credits on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "latitude",
        "longitude",
        "vertical_angle",
        "horizontal_angle",
        "back_view"
      ],
      "additionalProperties": null,
      "properties": {
        "heatmap_id": {
          "type": null,
          "description": "Existing Dashboard heatmap reference",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "date_time": {
          "type": null,
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": [
            {
              "properties": {
                "start_date": {
                  "description": "Start date in YYYY-MM-DD format",
                  "title": "Start Date",
                  "type": "string"
                },
                "end_date": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "End date in YYYY-MM-DD format",
                  "title": "End Date"
                },
                "start_time": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                  "title": "Start Time"
                },
                "end_time": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ],
                  "default": null,
                  "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                  "title": "End Time"
                },
                "filter_type": {
                  "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                  "enum": [
                    1,
                    2,
                    3,
                    4
                  ],
                  "title": "Filter Type",
                  "type": "integer"
                }
              },
              "required": [
                "start_date",
                "filter_type"
              ],
              "title": "SegmentationDateTimeRange",
              "type": "object"
            },
            {
              "type": "null"
            }
          ],
          "items": null
        },
        "latitude": {
          "type": "number",
          "description": "Latitude in decimal degrees (-90 to 90)",
          "enum": null,
          "default": null,
          "minimum": -90,
          "maximum": 90,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "longitude": {
          "type": "number",
          "description": "Longitude in decimal degrees (-180 to 180)",
          "enum": null,
          "default": null,
          "minimum": -180,
          "maximum": 180,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "vertical_angle": {
          "type": "number",
          "description": "Street View heading in degrees; the back view, when requested, uses heading + 180°. No input range is enforced.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "horizontal_angle": {
          "type": "number",
          "description": "Street View pitch control, 0-360; Engine divides this value by 100 before sending pitch in degrees (e.g. 100 gives 1°).",
          "enum": null,
          "default": null,
          "minimum": 0,
          "maximum": 360,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "back_view": {
          "type": "boolean",
          "description": "Also request an image facing 180° opposite the supplied heading.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    },
    {
      "name": "temperature_routing",
      "description": "Submit temperature-aware route generation between two coordinate locations at a departure time. Returns status=processing and an activity_id immediately; use temperature_routing_read to retrieve the activity's processing, completed, or failed result. The current graph is built from a driving-road network; travel mode cannot be selected. Routing supports the contiguous United States only. Route and temperature-source availability varies by location and departure time; no universal historical start date is promised. Paid: 3,500 credits on all entitled plans. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required": [
        "origin",
        "destination",
        "departure_time"
      ],
      "additionalProperties": false,
      "properties": {
        "origin": {
          "type": "object",
          "description": "Route endpoint coordinates in decimal latitude and longitude.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "destination": {
          "type": "object",
          "description": "Route endpoint coordinates in decimal latitude and longitude.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        },
        "departure_time": {
          "type": "string",
          "description": "ISO-8601 departure date-time. Include Z or an offset for an absolute instant (e.g. 2026-08-23T13:00:00Z); without an offset, Engine treats it as local wall time using the route tile's UTC offset, which may be approximate near DST.",
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    },
    {
      "name": "temperature_routing_read",
      "description": "Read an existing temperature-aware routing activity without generating routes again.",
      "required": [
        "activity_id"
      ],
      "additionalProperties": false,
      "properties": {
        "activity_id": {
          "type": "string",
          "description": null,
          "enum": null,
          "default": null,
          "minimum": null,
          "maximum": null,
          "minItems": null,
          "maxItems": null,
          "anyOf": null,
          "items": null
        }
      }
    }
  ]
}
```


---

## evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json

Source path: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`

```json
{
  "phase": "C",
  "timestamp_local": "2026-11-18T22:50:15+0530",
  "timestamp_utc": "2026-11-18T17:20:15Z",
  "namespace": "user-fortyguard",
  "tool": "credit_balance",
  "invocation_source": "cursor_mcp_integration",
  "succeeded": true,
  "error": null,
  "account_plan": "premium",
  "available_credits": 994200,
  "cost_credits": 0,
  "trace_id": "f0854581c856",
  "latency_ms": 1095,
  "decision": "allow",
  "status": "ok",
  "notes": [
    "Single live MCP invocation only",
    "No SDK/HTTP/script substitute",
    "Credentials redacted; mcp.json unchanged"
  ]
}
```


---

## evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json

Source path: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`

```json
{
  "phase": "D",
  "timestamp_local": "2026-11-18T22:51:55+0530",
  "timestamp_utc": "2026-11-18T17:21:55Z",
  "mcp_namespace": "user-fortyguard",
  "discovery_method": "Cursor GetDynamicTools namespace inspection only; no tool invocations",
  "tools_invoked": [],
  "confirmation_no_tools_invoked": true,
  "live_tool_count_including_cursor_helpers": 12,
  "live_fortyguard_tool_count": 11,
  "published_tool_count": 9,
  "historical_sdk_live_tool_count": 11,
  "live_tool_names": [
    "credit_balance",
    "env_params",
    "heatmap",
    "heatmap_read",
    "mcp_auth",
    "monitoring",
    "report",
    "report_read",
    "satellite",
    "streetview",
    "temperature_routing",
    "temperature_routing_read"
  ],
  "live_fortyguard_tool_names": [
    "credit_balance",
    "env_params",
    "heatmap",
    "heatmap_read",
    "monitoring",
    "report",
    "report_read",
    "satellite",
    "streetview",
    "temperature_routing",
    "temperature_routing_read"
  ],
  "published_tool_names": [
    "env_params",
    "heatmap",
    "heatmap_read",
    "report",
    "report_read",
    "satellite",
    "streetview",
    "temperature_routing",
    "temperature_routing_read"
  ],
  "cursor_only_helpers": [
    "mcp_auth"
  ],
  "catalogue_comparison": {
    "published_vs_live_fortyguard": "9 published vs 11 live FortyGuard tools",
    "historical_9_vs_11_still_holds": true,
    "additional_live_fortyguard_tools": [
      "credit_balance",
      "monitoring"
    ],
    "new_since_sdk_discovery": [],
    "cursor_namespace_extra": [
      "mcp_auth"
    ],
    "note": "mcp_auth is exposed in the Cursor MCP namespace as an authentication helper; it is not part of the published FortyGuard MCP catalogue and was not present in the earlier SDK tools/list evidence."
  },
  "confirmed_discrepancies": [
    {
      "id": "catalogue-count",
      "finding": "Published quickstart/troubleshooting list 9 tools; Cursor live discovery shows 11 FortyGuard tools plus Cursor-injected mcp_auth (12 total in namespace).",
      "evidence": "Published nine names in mcp-quickstart.md; live names from user-fortyguard discovery."
    },
    {
      "id": "undocumented-credit_balance-monitoring",
      "finding": "credit_balance and monitoring remain live and absent from the published Available Tools table and quickstart nine-tool list.",
      "evidence": "Live catalogue includes both; docs/mcp-tools table and quickstart omit them."
    },
    {
      "id": "report-temperature-unit",
      "finding": "Docs say report temperature is Celsius; live description and temperature field say Fahrenheit (\u00b0F).",
      "evidence": "docs mcp-tools key input vs live report description/schema."
    },
    {
      "id": "report-analysis-count",
      "finding": "Docs say one to five analyses; live schema maxItems=5/minItems=1; live description and analysis field text say Premium permits at most 2.",
      "evidence": "Contradiction across docs page, live description, and schema constraints."
    },
    {
      "id": "report_read-activity_id-alias",
      "finding": "Docs and analytics_id field description claim activity_id is an accepted alias; live schema requires analytics_id, does not define activity_id, and sets additionalProperties=false.",
      "evidence": "Live report_read inputSchema."
    },
    {
      "id": "streetview-angle-semantics",
      "finding": "Docs describe vertical_angle as viewing angle and horizontal_angle as pan 0\u2013360; live schema says vertical_angle is heading and horizontal_angle is pitch control divided by 100.",
      "evidence": "Live streetview property descriptions."
    },
    {
      "id": "wait_for_completion-absent",
      "finding": "Docs list wait_for_completion for heatmap, report, and temperature_routing; those live schemas do not include the property.",
      "evidence": "Live schemas for those three tools."
    },
    {
      "id": "monitoring-destructive-ops",
      "finding": "Live monitoring exposes create/update/delete/run operations including delete_monitor and delete_heatmap_data; list_monitors and list_alerts described as free, other ops 3,500 credits on premium. Not documented on MCP tools page.",
      "evidence": "Live monitoring description and operation enum."
    },
    {
      "id": "credit-prices-in-live-only",
      "finding": "Live tool descriptions include numeric credit costs; published tools page says calls may consume usage without printing those numbers.",
      "evidence": "Live paid tool descriptions vs mcp-tools.md."
    },
    {
      "id": "heatmap_read-id-fields",
      "finding": "Docs key input is heatmap_id only; live schema accepts activity_id or heatmap_id, neither required.",
      "evidence": "Live heatmap_read schema."
    }
  ],
  "unverified_discrepancies": [
    {
      "id": "env_params-direct-vs-activity",
      "finding": "Docs label env_params DIRECT and say it returns results. Live description describes point-level conditions and paid credits but does not explicitly state whether the MCP response is immediate measurements or an activity_id. Runtime behavior not tested in Phase D.",
      "status": "unverified_without_invocation"
    },
    {
      "id": "report_read-alias-runtime",
      "finding": "Whether submitting activity_id somehow works despite schema rejection of additional properties was not runtime-tested.",
      "status": "unverified_without_invocation"
    },
    {
      "id": "streetview-angle-runtime",
      "finding": "Heading/pitch scaling semantics are stated in the live schema text; actual engine behavior was not invoked.",
      "status": "unverified_without_invocation"
    }
  ],
  "tools": [
    {
      "name": "credit_balance",
      "description": "Read your available Enterprise API credits; free and read-only.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {}
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Description: free and read-only",
        "restrictions": []
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "env_params",
      "description": "Point-level environmental conditions for a single coordinate and date \u2014 e.g. provider-sourced apparent temperature, wet-bulb temperature, humidity, precipitation, and AQI, plus modeled clear-sky solar irradiance estimates (GHI, DNI, and DHI in W/m\u00b2). Provide the location's temperature in Celsius, supplied by the user or obtained from a reliable source. If it is unavailable, ask the user; never invent, assume, or silently substitute a temperature. heat_index_celsius is derived from this temperature and provider-sourced relative humidity. Use for a single location's numeric values, not area-wide maps or written reports. Historical temperature requests start at 2021-01-01; provider availability varies by location, date, and parameter. Future dates are unsupported. Paid: 2,110 credits on basic/startup, 2,900 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "temperature",
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "latitude": {
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "temperature": {
            "description": "Caller-supplied reference temperature in degrees Celsius. Used with provider-sourced relative humidity to calculate heat_index_celsius.",
            "title": "Temperature",
            "type": "number"
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "Start date in YYYY-MM-DD format",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End date in YYYY-MM-DD format",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "SegmentationDateTimeRange",
            "type": "object"
          },
          "analysis": {
            "anyOf": [
              {
                "items": {
                  "description": "Environmental measurements available for selection.",
                  "enum": [
                    "heat_index_celsius",
                    "apparent_temperature_celsius",
                    "wet_bulb_temperature_celsius",
                    "relative_humidity_percent",
                    "precipitation_mm",
                    "cloud_cover_octas",
                    "elevation_meters",
                    "aqi_us",
                    "aqi_us_pm25",
                    "aqi_us_pm10",
                    "aqi_us_no2",
                    "aqi_us_co",
                    "aqi_us_o3",
                    "aqi_us_so2",
                    "methane_ppb",
                    "co2_ppm",
                    "solar_irradiance"
                  ],
                  "title": "AnalysisField",
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Output fields to return; omitted uses the default set. Temperature fields are \u00b0C; humidity %, precipitation mm, cloud cover octas (0-8), elevation m, AQI fields US AQI index, methane ppb, CO2 ppm, and solar_irradiance clear-sky GHI/DNI/DHI in W/m\u00b2.",
            "title": "Analysis"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "temperature",
          "date_time"
        ],
        "title": "EnvParamsInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 2,110 credits on basic/startup, 2,900 on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "heatmap",
      "description": "Submit a standalone temperature or analytic heatmap for a polygon and local date window. start_time and end_time are HH:MM local wall times at the polygon AOI, not UTC; ambiguous or nonexistent DST times are rejected. A heatmap request can cover at most 31 calendar dates, counting both the start and end dates. For longer ranges, explain the limit and request approval before each separate paid submission. Exceedance counts sampled hours; persistence counts continuous sampled hours; thresholds are Celsius with strict above/below comparisons. Time of measure returns the maximum sample's UTC hour, using the earliest timestamp on ties. Returns status=processing and an activity_id immediately; use heatmap_read to retrieve the activity's processing, completed, or failed result. Historical temperature requests start at 2021-01-01; catalog availability varies by location and date. Paid: 3,500 credits on free/basic/startup, 4,220 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "polygon_aoi",
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "polygon_aoi": {
            "additionalProperties": true,
            "description": "Closed GeoJSON Polygon, Feature or FeatureCollection; longitude then latitude",
            "title": "Polygon Aoi",
            "type": "object"
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "YYYY-MM-DD (historical temperature minimum 2021-01-01; catalog data is not guaranteed)",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "YYYY-MM-DD (required for filter_type 4)",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "HH:MM 24h local wall time at the polygon AOI, not UTC (filter_type 1/2). Ambiguous or nonexistent DST times are rejected.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "HH:MM 24h local wall time at the polygon AOI, not UTC (filter_type 2). Ambiguous or nonexistent DST times are rejected.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=one local hour; 2=same-day local hours (end exclusive for hour-aligned inputs); 3=one local day; 4=inclusive local date range, at most 31 calendar dates",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "EnterpriseDateTimeRange",
            "type": "object"
          },
          "granularity": {
            "default": 100,
            "description": "Heatmap output grid size in meters: 60, 80, or 100 (default 100). Smaller cells produce a finer map.",
            "enum": [
              60,
              80,
              100
            ],
            "title": "Granularity",
            "type": "integer"
          },
          "analytic_type": {
            "default": "tcm",
            "description": "tcm=temperature map (default); time_of_measure=peak temperature hour; exceedance=hours beyond threshold; persistence=continuous hours beyond threshold",
            "enum": [
              "tcm",
              "time_of_measure",
              "exceedance",
              "persistence"
            ],
            "title": "Analytic Type",
            "type": "string"
          },
          "threshold": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Celsius; defaults to 30 for exceedance/persistence",
            "title": "Threshold"
          },
          "direction": {
            "anyOf": [
              {
                "enum": [
                  "above",
                  "below"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Direction"
          },
          "idempotency_key": {
            "anyOf": [
              {
                "maxLength": 128,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Idempotency Key"
          },
          "map_type": {
            "default": "bm",
            "description": "Legacy Dashboard presentation code; accepted for compatibility but ignored by Enterprise/MCP heatmap execution. Use analytic_type to choose the analysis.",
            "enum": [
              "bm",
              "tcm",
              "tccm"
            ],
            "title": "Map Type",
            "type": "string"
          },
          "notify_by_email": {
            "default": false,
            "title": "Notify By Email",
            "type": "boolean"
          }
        },
        "required": [
          "polygon_aoi",
          "date_time"
        ],
        "additionalProperties": false,
        "description": "Inputs for generating a standalone temperature or analytic heatmap.",
        "title": "EnterpriseHeatmapInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 3,500 credits on free/basic/startup, 4,220 on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "heatmap_read",
      "description": "Read bounded persisted statistics from an existing temperature or analytic heatmap. Use for grounded questions about a heatmap already shown in Dashboard; does not create or modify a heatmap.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {
          "activity_id": {
            "anyOf": [
              {
                "minLength": 1,
                "pattern": "^\\S+$",
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Activity ID returned by heatmap; provide this or heatmap_id",
            "title": "Activity Id"
          },
          "heatmap_id": {
            "anyOf": [
              {
                "minLength": 1,
                "pattern": "^\\S+$",
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Compatibility alias for activity_id",
            "title": "Heatmap Id"
          }
        },
        "title": "EnterpriseHeatmapReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "mcp_auth",
      "description": "Authenticate this MCP server so its tools can be used.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {},
        "additionalProperties": false
      },
      "classification": {
        "operation_class": "client_auth",
        "read_write": "auth",
        "paid": false,
        "destructive": false,
        "cost_notes": "Cursor-injected auth helper; not a FortyGuard analysis tool",
        "restrictions": [
          "Cursor client surface"
        ]
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "monitoring",
      "description": "Recurring temperature monitors of a heatmap: list, read, create, update, delete or run one now; read its latest run, its alerts and their reports. list_monitors and list_alerts are free. All other operations cost 3,500 credits on premium. For a paid operation, show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "operation"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "operation": {
            "enum": [
              "create_monitor",
              "get_monitor",
              "list_monitors",
              "update_monitor",
              "delete_monitor",
              "get_latest_run",
              "trigger_forecast",
              "list_alerts",
              "get_alert",
              "get_alert_report",
              "download_alert_report",
              "list_runs",
              "get_run",
              "delete_heatmap_data"
            ],
            "title": "Operation",
            "type": "string"
          },
          "monitor_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Monitor Id"
          },
          "alert_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Alert Id"
          },
          "run_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Run Id"
          },
          "heatmap_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Heatmap Id"
          },
          "name": {
            "anyOf": [
              {
                "maxLength": 120,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Name"
          },
          "boundary_geojson": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Boundary Geojson"
          },
          "rules": {
            "anyOf": [
              {
                "items": {
                  "additionalProperties": false,
                  "properties": {
                    "temporal_aggregation": {
                      "enum": [
                        "minimum",
                        "average",
                        "maximum"
                      ],
                      "title": "Temporal Aggregation",
                      "type": "string"
                    },
                    "spatial_aggregation": {
                      "enum": [
                        "minimum",
                        "maximum"
                      ],
                      "title": "Spatial Aggregation",
                      "type": "string"
                    },
                    "operator": {
                      "enum": [
                        "above",
                        "below",
                        "within_interval"
                      ],
                      "title": "Operator",
                      "type": "string"
                    },
                    "unit": {
                      "enum": [
                        "celsius",
                        "fahrenheit"
                      ],
                      "title": "Unit",
                      "type": "string"
                    },
                    "threshold": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Threshold"
                    },
                    "lower_bound": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Lower Bound"
                    },
                    "upper_bound": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Upper Bound"
                    }
                  },
                  "required": [
                    "temporal_aggregation",
                    "spatial_aggregation",
                    "operator",
                    "unit"
                  ],
                  "title": "MonitorRuleInput",
                  "type": "object"
                },
                "maxItems": 20,
                "minItems": 1,
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Rules"
          },
          "notifications": {
            "anyOf": [
              {
                "additionalProperties": false,
                "properties": {
                  "email": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Email",
                    "type": "array"
                  },
                  "sms": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Sms",
                    "type": "array"
                  },
                  "whatsapp": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Whatsapp",
                    "type": "array"
                  }
                },
                "title": "MonitorNotifications",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Required for create_monitor: include at least one email, sms, or whatsapp destination."
          },
          "enabled": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Enabled"
          },
          "generate_report": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Generate Report"
          },
          "file_type": {
            "anyOf": [
              {
                "enum": [
                  "pdf",
                  "docx"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "File Type"
          },
          "cursor": {
            "anyOf": [
              {
                "maxLength": 512,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Cursor"
          },
          "limit": {
            "anyOf": [
              {
                "maximum": 100,
                "minimum": 1,
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Limit"
          },
          "status": {
            "anyOf": [
              {
                "maxLength": 64,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Status"
          }
        },
        "required": [
          "operation"
        ],
        "additionalProperties": false,
        "title": "MonitoringInput"
      },
      "classification": {
        "operation_class": "mixed",
        "read_write": "mixed",
        "paid": true,
        "destructive": true,
        "cost_notes": "list_monitors and list_alerts free; other operations 3,500 credits on premium",
        "restrictions": [
          "Includes delete_monitor and delete_heatmap_data",
          "Ask confirmation before paid ops"
        ],
        "operations": [
          "create_monitor",
          "get_monitor",
          "list_monitors",
          "update_monitor",
          "delete_monitor",
          "get_latest_run",
          "trigger_forecast",
          "list_alerts",
          "get_alert",
          "get_alert_report",
          "download_alert_report",
          "list_runs",
          "get_run",
          "delete_heatmap_data"
        ]
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "report",
      "description": "Submit a heat-intelligence report for a point and date. Provide the point temperature in degrees Fahrenheit (\u00b0F). Returns status=processing and an activity_id immediately; use report_read to retrieve the activity's processing, completed, or failed result. Premium permits at most 2 analysis types per report; select 1 or 2. Historical temperature requests start at 2021-01-01; historical weather and other source availability varies by location and date. Reports can take several minutes; poll report_read with the returned activity_id. Paid: 6,300 credits on free, 8,600 on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "temperature",
        "date",
        "analysis"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "polygon": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Dashboard report area polygon",
            "title": "Polygon"
          },
          "report_polygon": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Explicit enriched Dashboard tile polygon",
            "title": "Report Polygon"
          },
          "selected_heat_intelligence_tile_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Selected Heat Intelligence Tile Id"
          },
          "date_time": {
            "anyOf": [
              {
                "properties": {
                  "start_date": {
                    "description": "Start date in YYYY-MM-DD format",
                    "title": "Start Date",
                    "type": "string"
                  },
                  "end_date": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End date in YYYY-MM-DD format",
                    "title": "End Date"
                  },
                  "start_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "Start Time"
                  },
                  "end_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "End Time"
                  },
                  "filter_type": {
                    "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                    "enum": [
                      1,
                      2,
                      3,
                      4
                    ],
                    "title": "Filter Type",
                    "type": "integer"
                  }
                },
                "required": [
                  "start_date",
                  "filter_type"
                ],
                "title": "SegmentationDateTimeRange",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "granularity": {
            "default": 100,
            "title": "Granularity",
            "type": "integer"
          },
          "notify_by_email": {
            "default": false,
            "title": "Notify By Email",
            "type": "boolean"
          },
          "latitude": {
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "temperature": {
            "description": "Point temperature in degrees Fahrenheit (\u00b0F)",
            "title": "Temperature",
            "type": "number"
          },
          "date": {
            "description": "YYYY-MM-DD, past or present only",
            "title": "Date",
            "type": "string"
          },
          "analysis": {
            "description": "1-5 of: geographic, environmental, urban, events, anthropogenic. Enterprise Premium allows at most 2 per report.",
            "items": {
              "enum": [
                "geographic",
                "environmental",
                "urban",
                "events",
                "anthropogenic"
              ],
              "title": "ReportAnalysis",
              "type": "string"
            },
            "maxItems": 5,
            "minItems": 1,
            "title": "Analysis",
            "type": "array"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "temperature",
          "date",
          "analysis"
        ],
        "title": "ReportInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 6,300 credits on free, 8,600 on premium.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "report_read",
      "description": "Read an existing completed Heat Intelligence report without generating a new report.",
      "required_parameters": [
        "analytics_id"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Dashboard heatmap context; required only for Dashboard reads.",
            "title": "Heatmap Id"
          },
          "analytics_id": {
            "description": "Report activity identifier returned by report; activity_id is an accepted input alias.",
            "minLength": 1,
            "pattern": "^\\S+$",
            "title": "Analytics Id",
            "type": "string"
          }
        },
        "required": [
          "analytics_id"
        ],
        "additionalProperties": false,
        "title": "EnterpriseReportReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "satellite",
      "description": "Segment a satellite image for a point into land-cover classes. Use for overhead imagery; use streetview for ground-level imagery. Shared accepts request dates from 2019-01-01; Enterprise's configured minimum may differ, and imagery availability varies by location and capture date. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 14,400 credits on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "tiles": {
            "anyOf": [
              {},
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Selected tile or polygon for Dashboard segmentation",
            "title": "Tiles"
          },
          "big_area": {
            "default": false,
            "description": "Dashboard polygon mode only; Enterprise/MCP point requests ignore this flag. Default false.",
            "title": "Big Area",
            "type": "boolean"
          },
          "sat": {
            "anyOf": [
              {
                "properties": {
                  "latitude": {
                    "description": "Latitude in decimal degrees (-90 to 90)",
                    "maximum": 90,
                    "minimum": -90,
                    "title": "Latitude",
                    "type": "number"
                  },
                  "longitude": {
                    "description": "Longitude in decimal degrees (-180 to 180)",
                    "maximum": 180,
                    "minimum": -180,
                    "title": "Longitude",
                    "type": "number"
                  }
                },
                "required": [
                  "latitude",
                  "longitude"
                ],
                "title": "SatellitePointInput",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "Start date in YYYY-MM-DD format",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End date in YYYY-MM-DD format",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "SegmentationDateTimeRange",
            "type": "object"
          },
          "granularity": {
            "default": 100,
            "description": "Point imagery buffer radius in meters: 60, 80, or 100 (default 100).",
            "enum": [
              60,
              80,
              100
            ],
            "title": "Granularity",
            "type": "integer"
          }
        },
        "required": [
          "date_time"
        ],
        "title": "SatelliteSegmentationInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 14,400 credits on premium.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "streetview",
      "description": "Segment street-view imagery for a point into visible urban classes. Use for ground-level front/back views; use satellite for overhead imagery. Street View availability and image capture dates vary by location; a supplied date is not an imagery guarantee. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 8,600 credits on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "vertical_angle",
        "horizontal_angle",
        "back_view"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "date_time": {
            "anyOf": [
              {
                "properties": {
                  "start_date": {
                    "description": "Start date in YYYY-MM-DD format",
                    "title": "Start Date",
                    "type": "string"
                  },
                  "end_date": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End date in YYYY-MM-DD format",
                    "title": "End Date"
                  },
                  "start_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "Start Time"
                  },
                  "end_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "End Time"
                  },
                  "filter_type": {
                    "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                    "enum": [
                      1,
                      2,
                      3,
                      4
                    ],
                    "title": "Filter Type",
                    "type": "integer"
                  }
                },
                "required": [
                  "start_date",
                  "filter_type"
                ],
                "title": "SegmentationDateTimeRange",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "latitude": {
            "description": "Latitude in decimal degrees (-90 to 90)",
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "description": "Longitude in decimal degrees (-180 to 180)",
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "vertical_angle": {
            "description": "Street View heading in degrees; the back view, when requested, uses heading + 180\u00b0. No input range is enforced.",
            "title": "Vertical Angle",
            "type": "number"
          },
          "horizontal_angle": {
            "description": "Street View pitch control, 0-360; Engine divides this value by 100 before sending pitch in degrees (e.g. 100 gives 1\u00b0).",
            "maximum": 360,
            "minimum": 0,
            "title": "Horizontal Angle",
            "type": "number"
          },
          "back_view": {
            "description": "Also request an image facing 180\u00b0 opposite the supplied heading.",
            "title": "Back View",
            "type": "boolean"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "vertical_angle",
          "horizontal_angle",
          "back_view"
        ],
        "title": "StreetViewSegmentationInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 8,600 credits on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "temperature_routing",
      "description": "Submit temperature-aware route generation between two coordinate locations at a departure time. Returns status=processing and an activity_id immediately; use temperature_routing_read to retrieve the activity's processing, completed, or failed result. The current graph is built from a driving-road network; travel mode cannot be selected. Routing supports the contiguous United States only. Route and temperature-source availability varies by location and departure time; no universal historical start date is promised. Paid: 3,500 credits on all entitled plans. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "origin",
        "destination",
        "departure_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "origin": {
            "additionalProperties": false,
            "description": "Route endpoint coordinates in decimal latitude and longitude.",
            "properties": {
              "lat": {
                "maximum": 90,
                "minimum": -90,
                "title": "Lat",
                "type": "number"
              },
              "lon": {
                "maximum": 180,
                "minimum": -180,
                "title": "Lon",
                "type": "number"
              }
            },
            "required": [
              "lat",
              "lon"
            ],
            "title": "RoutingCoordinates",
            "type": "object"
          },
          "destination": {
            "additionalProperties": false,
            "description": "Route endpoint coordinates in decimal latitude and longitude.",
            "properties": {
              "lat": {
                "maximum": 90,
                "minimum": -90,
                "title": "Lat",
                "type": "number"
              },
              "lon": {
                "maximum": 180,
                "minimum": -180,
                "title": "Lon",
                "type": "number"
              }
            },
            "required": [
              "lat",
              "lon"
            ],
            "title": "RoutingCoordinates",
            "type": "object"
          },
          "departure_time": {
            "description": "ISO-8601 departure date-time. Include Z or an offset for an absolute instant (e.g. 2026-08-23T13:00:00Z); without an offset, Engine treats it as local wall time using the route tile's UTC offset, which may be approximate near DST.",
            "minLength": 1,
            "title": "Departure Time",
            "type": "string"
          }
        },
        "required": [
          "origin",
          "destination",
          "departure_time"
        ],
        "additionalProperties": false,
        "title": "TemperatureRoutingInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 3,500 credits on all entitled plans.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "temperature_routing_read",
      "description": "Read an existing temperature-aware routing activity without generating routes again.",
      "required_parameters": [
        "activity_id"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "activity_id": {
            "minLength": 1,
            "pattern": "^\\S+$",
            "title": "Activity Id",
            "type": "string"
          }
        },
        "required": [
          "activity_id"
        ],
        "additionalProperties": false,
        "title": "TemperatureRoutingReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    }
  ],
  "documentation_sources": [
    "https://docs-api.fortyguard.com/docs/mcp-overview",
    "https://docs-api.fortyguard.com/docs/mcp-tools",
    "https://docs-api.fortyguard.com/docs/mcp-quickstart",
    "evidence/mcp-fresh/documentation/mcp-tools.md",
    "evidence/mcp-fresh/documentation/mcp-quickstart.md",
    "evidence/mcp-fresh/2026-11-18-discovery.json"
  ],
  "phase_c_preserved": {
    "tool": "credit_balance",
    "source": "Cursor MCP",
    "available_credits": 994200,
    "plan": "premium",
    "cost_credits": 0,
    "evidence": "evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json"
  }
}
```


---

## evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.md

Source path: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.md`

# Phase C — Live MCP verification (`credit_balance`)

- Local timestamp: `2026-11-18T22:50:15+0530`
- UTC timestamp: `2026-11-18T17:20:15Z`
- Namespace: `user-fortyguard`
- Tool invoked: `credit_balance` (exactly one tool; no other FortyGuard tools)
- Invocation path: Cursor MCP integration (`CallDynamicTool` → `user-fortyguard.credit_balance`)
- Not used: SDK, terminal HTTP, scripts, direct API calls

## Result

- MCP tool invocation: **succeeded** (`ok: true`, trace `status: ok`, `decision: allow`)
- Account plan: `premium`
- Available credit balance: `994200`
- Operation cost: `0` credits
- Error message: none

## Redacted response

```json
{
  "ok": true,
  "result": {
    "tool": "credit_balance",
    "value": {
      "available_credits": 994200
    },
    "evidence": [],
    "warnings": []
  },
  "trace": {
    "trace_id": "f0854581c856",
    "tool": "credit_balance",
    "plan_type": "premium",
    "decision": "allow",
    "status": "ok",
    "latency_ms": 1095,
    "cost_credits": 0
  }
}
```

Credentials and bearer tokens are not included. `mcp.json` was not modified.


---

## evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.md

Source path: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.md`

# Phase D — Live MCP tool discovery (Cursor)

- Local timestamp: `2026-11-18T22:51:55+0530`
- UTC timestamp: `2026-11-18T17:21:55Z`
- MCP namespace: `user-fortyguard`
- Discovery method: Cursor MCP tool listing only (`GetDynamicTools`)
- Tools invoked in Phase D: **none**
- Phase C preserved: Cursor `credit_balance` returned Premium / 994,200 / cost 0

## Counts

| Scope | Count |
| --- | --- |
| Published catalogue (quickstart / tools page) | **9** |
| Earlier SDK live catalogue | **11** |
| Cursor namespace tools discovered now | **12** |
| FortyGuard-owned live tools (excluding Cursor helper) | **11** |

## Complete tool names (Cursor namespace)

1. `credit_balance`
2. `env_params`
3. `heatmap`
4. `heatmap_read`
5. `mcp_auth` *(Cursor-injected auth helper; not in published FortyGuard catalogue; not in earlier SDK `tools/list`)*
6. `monitoring`
7. `report`
8. `report_read`
9. `satellite`
10. `streetview`
11. `temperature_routing`
12. `temperature_routing_read`

FortyGuard live set remains the historical 11 names above without `mcp_auth`.

## Published versus live

Published nine:

`env_params`, `heatmap`, `heatmap_read`, `report`, `report_read`, `satellite`, `streetview`, `temperature_routing`, `temperature_routing_read`

Live FortyGuard additions still present and still undocumented on the MCP tools/quickstart pages:

- `credit_balance` — free read-only credit check
- `monitoring` — mixed read/write; includes destructive operations

**The historical 9-versus-11 discrepancy still holds** for FortyGuard tools. Cursor additionally surfaces `mcp_auth`.

## Tool summary (no invocations)

| Tool | Class | Required inputs | Cost / risk notes from live text |
| --- | --- | --- | --- |
| `credit_balance` | read | none | Free, read-only |
| `env_params` | paid execute | latitude, longitude, temperature, date_time | 2,110 basic/startup; 2,900 premium/hackathon |
| `heatmap` | paid async write | polygon_aoi, date_time | 3,500 free/basic/startup; 4,220 premium/hackathon; returns activity_id |
| `heatmap_read` | read | neither required; accepts activity_id or heatmap_id | Read existing heatmap stats |
| `mcp_auth` | client auth | none | Cursor helper |
| `monitoring` | mixed / destructive | operation | list_monitors & list_alerts free; other ops 3,500 premium; includes delete_monitor, delete_heatmap_data |
| `report` | paid async write | latitude, longitude, temperature, date, analysis | 6,300 free; 8,600 premium; Fahrenheit; Premium ≤2 analyses |
| `report_read` | read | analytics_id | Read completed report |
| `satellite` | paid execute | date_time | Live text: 14,400 on Premium (from prior/live wording in catalogue) |
| `streetview` | paid execute | latitude, longitude, vertical_angle, horizontal_angle, back_view | 8,600 premium/hackathon |
| `temperature_routing` | paid async write | origin, destination, departure_time | 3,500 all entitled plans; returns activity_id |
| `temperature_routing_read` | read | activity_id | Read existing routing activity |

Full descriptions and input schemas: `2026-11-18-phase-d-tool-discovery.json`.

## Confirmed documentation / schema mismatches

1. **Catalogue count**: docs say nine; live FortyGuard tools are eleven (`credit_balance`, `monitoring` missing from docs).
2. **`report` temperature unit**: docs Celsius; live description + schema field Fahrenheit (°F).
3. **`report` analysis count**: docs 1–5; schema `maxItems: 5`; live text says Premium at most 2.
4. **`report_read` alias**: docs + field text claim `activity_id` alias; schema requires `analytics_id`, no `activity_id` property, `additionalProperties: false`.
5. **Street View angles**: docs vertical viewing angle / horizontal pan; live vertical=heading, horizontal=pitch÷100.
6. **`wait_for_completion`**: documented for heatmap/report/routing; absent from those live schemas.
7. **`monitoring`**: live with free list ops and paid/destructive ops; not on MCP tools page.
8. **Numeric credit costs**: present in live descriptions; tools page omits numbers.
9. **`heatmap_read` IDs**: docs list `heatmap_id`; live accepts `activity_id` or `heatmap_id`, neither required.

## Unverified without invocation

- Whether `env_params` returns direct measurements or an activity id at runtime.
- Whether `report_read` accepts `activity_id` at runtime despite schema rejection of extra properties.
- Actual Street View heading/pitch engine behavior.

## Safety confirmation

No Phase D tool calls were made. No paid, destructive, monitoring, heatmap, report, routing, or imagery operations were executed. `mcp.json` was not modified. Google Form was not submitted.


---

## evidence/mcp-fresh/cursor-integration/2026-11-18-relaunch-status.md

Source path: `evidence/mcp-fresh/cursor-integration/2026-11-18-relaunch-status.md`

# Cursor relaunch status

18 November 2026, checked again after 22:19 local time.

## Phase A

- Project `.env` exists.
- `FORTYGUARD_API_KEY` is set. Length 32. Value not printed.
- `~/.cursor/mcp.json` still has `railway` and `fortyguard`.
- Authorization remains `Bearer ${env:FORTYGUARD_API_KEY}`.
- The key is not in `mcp.json`.

## Phase B

This Cursor process still does not have `FORTYGUARD_API_KEY` in its environment. A Terminal relaunch with `source .env` and `export FORTYGUARD_API_KEY` has not been confirmed for the process that is running this Agent.

## Phase C

Cursor detects `user-fortyguard`. Live tool discovery is in error. The newest log session is `20261118T221906`:

- Streamable HTTP connect started.
- Server returned HTTP 401, `invalid_token`.
- OAuth fallback failed.
- Connection status: `conn=failed`.
- No tools exposed.
- `credit_balance` not called.

An earlier same-day SDK session with the key loaded from `.env` succeeded. That is not a Cursor result.

## Stopped

Phases D through G wait until Cursor is quit with `Cmd + Q` and relaunched from Terminal with the exported key.


---

## evidence/mcp-fresh/cursor-integration/connection-status.md

Source path: `evidence/mcp-fresh/cursor-integration/connection-status.md`

# Cursor MCP integration attempt

18 November 2026, 22:02 local time.

## Configuration

`~/.cursor/mcp.json` matches the official Cursor example. Railway is still present. FortyGuard uses `Bearer ${env:FORTYGUARD_API_KEY}`. The key is not in the file.

`FORTYGUARD_API_KEY` is set in the project `.env`. It is not set in the shell that launched Cursor, and it is not in `.zshrc`, `.zprofile`, or `.zshenv`. Cursor does not load a project `.env` for a remote HTTP MCP server.

## Connection

Cursor detected `fortyguard` and opened Streamable HTTP.

- Result: `conn=failed`
- HTTP 401
- Body: `invalid_token`. The bearer token was not recognized.
- OAuth fallback failed.
- Tools were not listed.
- `credit_balance` was not called.

The same key connected through the SDK earlier, when the script loaded `.env` directly. This 401 is the Cursor process missing that variable.


---

## evidence/mcp-fresh/cursor-integration/mcp-json-sanitized.json

Source path: `evidence/mcp-fresh/cursor-integration/mcp-json-sanitized.json`

```json
{
  "mcpServers": {
    "railway": {
      "args": ["mcp"],
      "command": "railway"
    },
    "fortyguard": {
      "url": "https://tos-mcp.app.fortyguard.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:FORTYGUARD_API_KEY}"
      }
    }
  }
}
```


# Section 3 — Functional execution evidence (`evidence/mcp-fresh/complete-evaluation/`)


---

## evidence/mcp-fresh/complete-evaluation/mcp-documentation-discrepancies.md

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-documentation-discrepancies.md`

# MCP documentation discrepancies

Evidence date: 2026-11-18. Sources: live Cursor schemas (Phase D), published docs captures, and new free functional probes.

## Confirmed (schema/docs)

1. Published catalogue lists **9** tools; live FortyGuard catalogue has **11** (`credit_balance`, `monitoring` undocumented). Cursor also surfaces `mcp_auth`.
2. `report` temperature: docs °C; live description/field °F.
3. `report` analysis limits: docs 1–5; schema maxItems 5; Premium live text ≤2.
4. `wait_for_completion` documented for heatmap/report/routing; absent from live schemas.
5. Street View angles: docs viewing/pan; live heading / pitch÷100.
6. Numeric credit costs in live tool text; tools page omits numbers.
7. `heatmap_read` docs emphasize `heatmap_id`; live accepts `activity_id` or `heatmap_id`.
8. `monitoring` live with destructive ops; not on MCP tools page.

## Confirmed or updated by runtime (this session)

9. `monitoring.list_monitors` is free and works (`cost_credits` 0).
10. `monitoring.list_alerts` is described as free but returned `invalid_input` with only `operation` (and again with `limit`). Free-claim incomplete/broken for alerts list.
11. `report_read` **runtime accepts `activity_id`** and returns the same not-found denial path as `analytics_id`, even though the JSON schema does not define `activity_id` and sets `additionalProperties: false`. Docs alias claim is operationally true; schema contract remains inaccurate.
12. Invalid activity identifiers on read tools return clear `ACTIVITY_UNAVAILABLE` denials.
13. Empty `heatmap_read` returns field-specific `INVALID_ACTIVITY_ID` even though schema marks neither id required.

## Unverified without paid invocation

- Whether `env_params` returns direct measurements or an activity id.
- Actual Street View heading/pitch engine behaviour.
- Paid analysis correctness for heatmap/report/satellite/routing.

## Not claimed as product failure

- Initial Cursor `401 invalid_token` was an environment inheritance setup issue and was resolved by relaunching with the exported key.


---

## evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.json

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.json`

```json
{
  "phase": "complete-functional-evaluation",
  "started_local": "2026-11-18T22:55:50+0530",
  "ended_local": "2026-11-18T22:58:30+0530",
  "started_utc": "2026-11-18T17:25:50Z",
  "ended_utc": "2026-11-18T17:28:30Z",
  "invocation_source": "cursor_mcp_integration",
  "namespace": "user-fortyguard",
  "connectivity": {
    "namespace_status": "ready",
    "auth": "Bearer via FORTYGUARD_API_KEY in Cursor process environment",
    "transport": "Streamable HTTP",
    "endpoint": "https://tos-mcp.app.fortyguard.com/mcp",
    "initial_401_resolved": true,
    "protocol_version_exposed_in_cursor_listing": null,
    "sdk_protocol_version_historical": "2025-11-25",
    "server_version_historical_sdk": "FortyGuard 4.0.11"
  },
  "reuse": {
    "phase_c_credit_balance": {
      "phase": "C",
      "timestamp_local": "2026-11-18T22:50:15+0530",
      "timestamp_utc": "2026-11-18T17:20:15Z",
      "namespace": "user-fortyguard",
      "tool": "credit_balance",
      "invocation_source": "cursor_mcp_integration",
      "succeeded": true,
      "error": null,
      "account_plan": "premium",
      "available_credits": 994200,
      "cost_credits": 0,
      "trace_id": "f0854581c856",
      "latency_ms": 1095,
      "decision": "allow",
      "status": "ok",
      "notes": [
        "Single live MCP invocation only",
        "No SDK/HTTP/script substitute",
        "Credentials redacted; mcp.json unchanged"
      ]
    },
    "phase_d_discovery_path": "evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json"
  },
  "executions": [
    {
      "tool": "credit_balance",
      "invocation_source": "Cursor MCP",
      "purpose": "Phase C free read-only baseline (reused; not re-invoked)",
      "input": {},
      "result": {
        "available_credits": 994200,
        "plan_type": "premium",
        "cost_credits": 0
      },
      "status": "success",
      "latency_ms": 1095,
      "cost": {
        "actual": 0,
        "documented": "free"
      },
      "trace_id": "f0854581c856",
      "finding": "Cursor MCP can execute a free tool successfully after env-correct relaunch."
    },
    {
      "tool": "monitoring",
      "invocation_source": "Cursor MCP",
      "purpose": "Confirm free list_monitors operation",
      "input": {
        "operation": "list_monitors"
      },
      "result": {
        "ok": true,
        "value": {
          "operation": "list_monitors",
          "status": "completed",
          "monitors": [],
          "has_more": false
        }
      },
      "status": "success",
      "latency_ms": 1668,
      "cost": {
        "actual": 0,
        "documented": "free"
      },
      "trace_id": "f60562e03d46",
      "finding": "Free monitoring list works; empty monitor set returned; cost_credits 0."
    },
    {
      "tool": "monitoring",
      "invocation_source": "Cursor MCP",
      "purpose": "Confirm free list_alerts claim",
      "input": {
        "operation": "list_alerts"
      },
      "result": {
        "ok": false,
        "error": {
          "category": "invalid_input",
          "message": "The request input is invalid.",
          "retriable": false
        }
      },
      "status": "failure",
      "latency_ms": 0,
      "cost": {
        "actual": null,
        "documented": "free",
        "note": "No cost_credits field; latency 0; appears uncharged"
      },
      "trace_id": "f31125965e3c",
      "finding": "list_alerts described as free but rejected as invalid_input with only required operation set."
    },
    {
      "tool": "monitoring",
      "invocation_source": "Cursor MCP",
      "purpose": "Retry list_alerts with limit",
      "input": {
        "operation": "list_alerts",
        "limit": 10
      },
      "result": {
        "ok": false,
        "error": {
          "category": "invalid_input",
          "message": "The request input is invalid.",
          "retriable": false
        }
      },
      "status": "failure",
      "latency_ms": 0,
      "cost": {
        "actual": null,
        "documented": "free"
      },
      "trace_id": "26fea41f029c",
      "finding": "Optional limit did not resolve list_alerts invalid_input."
    },
    {
      "tool": "heatmap_read",
      "invocation_source": "Cursor MCP",
      "purpose": "Error handling for invalid activity_id",
      "input": {
        "activity_id": "invalid-eval-heatmap-id-0001"
      },
      "result": {
        "ok": false,
        "error": {
          "category": "denied",
          "code": "ACTIVITY_UNAVAILABLE",
          "message": "Activity not found or unavailable to this account. Check the activity ID and try again."
        }
      },
      "status": "failure_expected",
      "latency_ms": 1000,
      "cost": {
        "actual": null,
        "documented": "read; no paid language"
      },
      "trace_id": "32dba26040eb",
      "finding": "Clear server-side denial for unknown heatmap activity."
    },
    {
      "tool": "report_read",
      "invocation_source": "Cursor MCP",
      "purpose": "Error handling for invalid analytics_id",
      "input": {
        "analytics_id": "invalid-eval-report-id-0001"
      },
      "result": {
        "ok": false,
        "error": {
          "category": "denied",
          "code": "ACTIVITY_UNAVAILABLE",
          "message": "Activity not found or unavailable to this account. Check the activity ID and try again."
        }
      },
      "status": "failure_expected",
      "latency_ms": 1782,
      "cost": {
        "actual": null,
        "documented": "read"
      },
      "trace_id": "1122fa0dba22",
      "finding": "Clear denial for unknown report analytics_id."
    },
    {
      "tool": "report_read",
      "invocation_source": "Cursor MCP",
      "purpose": "Runtime probe of documented activity_id alias",
      "input": {
        "activity_id": "invalid-eval-report-id-0001"
      },
      "result": {
        "ok": false,
        "error": {
          "category": "denied",
          "code": "ACTIVITY_UNAVAILABLE",
          "message": "Activity not found or unavailable to this account. Check the activity ID and try again."
        }
      },
      "status": "failure_expected",
      "latency_ms": 590,
      "cost": {
        "actual": null,
        "documented": "read"
      },
      "trace_id": "f45557797baa",
      "finding": "activity_id reached server and returned ACTIVITY_UNAVAILABLE (same as analytics_id). Alias appears accepted at runtime despite not being a schema property and additionalProperties=false."
    },
    {
      "tool": "temperature_routing_read",
      "invocation_source": "Cursor MCP",
      "purpose": "Error handling for invalid activity_id",
      "input": {
        "activity_id": "invalid-eval-route-id-0001"
      },
      "result": {
        "ok": false,
        "error": {
          "category": "denied",
          "code": "ACTIVITY_UNAVAILABLE",
          "message": "Activity not found or unavailable to this account. Check the activity ID and try again."
        }
      },
      "status": "failure_expected",
      "latency_ms": 854,
      "cost": {
        "actual": null,
        "documented": "read"
      },
      "trace_id": "6509fec48549",
      "finding": "Clear denial for unknown routing activity."
    },
    {
      "tool": "heatmap_read",
      "invocation_source": "Cursor MCP",
      "purpose": "Missing required identifier validation",
      "input": {},
      "result": {
        "ok": false,
        "error": {
          "category": "invalid_input",
          "code": "INVALID_ACTIVITY_ID",
          "field": "activity_id",
          "message": "activity_id must be a non-empty identifier without whitespace."
        }
      },
      "status": "failure_expected",
      "latency_ms": 0,
      "cost": {
        "actual": null,
        "documented": "read"
      },
      "trace_id": "375cc5dcc562",
      "finding": "Server validates missing activity_id with field-specific invalid_input even though schema marks neither id required."
    },
    {
      "tool": "monitoring",
      "invocation_source": "Cursor MCP",
      "purpose": "Missing required operation validation",
      "input": {},
      "result": {
        "ok": false,
        "error": {
          "category": "invalid_input",
          "field": "operation",
          "message": "The request input is invalid."
        }
      },
      "status": "failure_expected",
      "latency_ms": 0,
      "cost": {
        "actual": null,
        "documented": "n/a"
      },
      "trace_id": "621f5af382a4",
      "finding": "Missing operation rejected with invalid_input and field=operation."
    }
  ],
  "summary": {
    "tools_executed_unique": [
      "credit_balance",
      "monitoring",
      "heatmap_read",
      "report_read",
      "temperature_routing_read"
    ],
    "successful_ops": [
      "credit_balance",
      "monitoring.list_monitors"
    ],
    "failed_ops_unexpected": [
      "monitoring.list_alerts",
      "monitoring.list_alerts+limit"
    ],
    "failed_ops_expected_validation_or_not_found": [
      "heatmap_read.invalid_id",
      "report_read.invalid_analytics_id",
      "report_read.activity_id_alias",
      "temperature_routing_read.invalid_id",
      "heatmap_read.empty",
      "monitoring.missing_operation"
    ],
    "paid_ops_executed": [],
    "destructive_ops_executed": [],
    "credits_spent_this_session": 0
  },
  "paid_approval_requests": [
    {
      "tool": "env_params",
      "purpose": "Resolve DIRECT vs activity-id behaviour and exercise a representative analysis tool for form completeness",
      "required_input": {
        "latitude": 33.4484,
        "longitude": -112.074,
        "temperature": 35,
        "date_time": {
          "start_date": "2025-09-20",
          "filter_type": 3
        }
      },
      "expected_credit_cost": 2900,
      "current_balance_phase_c": 994200,
      "why_necessary": "Only unpaid way left to verify env_params return shape vs docs DIRECT label; highest-value unpaid discrepancy.",
      "status": "awaiting_explicit_approval"
    },
    {
      "tool": "heatmap / report / satellite / streetview / temperature_routing / paid monitoring",
      "purpose": "Broader paid capability coverage",
      "expected_credit_cost": "3500\u201314400 depending on tool",
      "current_balance_phase_c": 994200,
      "why_necessary": "Would strengthen rating of paid analysis path; not required to draft form answers if env_params remains gated.",
      "status": "awaiting_explicit_approval"
    }
  ]
}
```


---

## evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.md

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.md`

# MCP functional test results (Cursor)

- Started local: `2026-11-18T22:55:50+0530`
- Ended local: `2026-11-18T22:58:30+0530`
- Namespace: `user-fortyguard`
- Invocation source: Cursor MCP only
- Paid/destructive operations: none executed

## Connectivity

- Status: ready
- Auth: Bearer from process env `FORTYGUARD_API_KEY`
- Transport: Streamable HTTP
- Initial 401: resolved by env-correct relaunch (not a persistent failure)

## Executions

| Tool | Purpose | Status | Latency ms | Cost | Trace | Finding |
| --- | --- | --- | --- | --- | --- | --- |
| `credit_balance` | Phase C free read-only baseline (reused; not re-invoked) | success | 1095 | 0 | `f0854581c856` | Cursor MCP can execute a free tool successfully after env-correct relaunch. |
| `monitoring` | Confirm free list_monitors operation | success | 1668 | 0 | `f60562e03d46` | Free monitoring list works; empty monitor set returned; cost_credits 0. |
| `monitoring` | Confirm free list_alerts claim | failure | 0 | n/a | `f31125965e3c` | list_alerts described as free but rejected as invalid_input with only required operation set. |
| `monitoring` | Retry list_alerts with limit | failure | 0 | n/a | `26fea41f029c` | Optional limit did not resolve list_alerts invalid_input. |
| `heatmap_read` | Error handling for invalid activity_id | failure_expected | 1000 | n/a | `32dba26040eb` | Clear server-side denial for unknown heatmap activity. |
| `report_read` | Error handling for invalid analytics_id | failure_expected | 1782 | n/a | `1122fa0dba22` | Clear denial for unknown report analytics_id. |
| `report_read` | Runtime probe of documented activity_id alias | failure_expected | 590 | n/a | `f45557797baa` | activity_id reached server and returned ACTIVITY_UNAVAILABLE (same as analytics_id). Alias appears accepted at runtime despite not being a schema property and additionalProperties=false. |
| `temperature_routing_read` | Error handling for invalid activity_id | failure_expected | 854 | n/a | `6509fec48549` | Clear denial for unknown routing activity. |
| `heatmap_read` | Missing required identifier validation | failure_expected | 0 | n/a | `375cc5dcc562` | Server validates missing activity_id with field-specific invalid_input even though schema marks neither id required. |
| `monitoring` | Missing required operation validation | failure_expected | 0 | n/a | `621f5af382a4` | Missing operation rejected with invalid_input and field=operation. |

## Summary

- Unique tools executed: `credit_balance`, `monitoring`, `heatmap_read`, `report_read`, `temperature_routing_read`
- Successful: credit_balance, monitoring.list_monitors
- Unexpected failures: monitoring.list_alerts, monitoring.list_alerts+limit
- Credits spent this session: 0
- Paid ops executed: none

## Paid approval gate (not executed)

### Candidate 1 — `env_params`
- Purpose: verify DIRECT vs activity-id behaviour
- Expected cost: 2,900 premium credits
- Balance (Phase C): 994,200
- Status: awaiting explicit approval

Other paid tools remain gated.


---

## evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md`

# MCP Google Form final answers (draft — NOT SUBMITTED)

Prepared 18 November 2026 from Cursor MCP evaluation (Phases B–D + free functional tests). Credentials redacted. Form not submitted.

## Did you try the MCP? How did you set it up and which client did you use?

Yes. Primary client for this evaluation pass: **Cursor**.

FortyGuard was configured in `~/.cursor/mcp.json` as a remote Streamable HTTP MCP server at `https://tos-mcp.app.fortyguard.com/mcp`, with `Authorization: Bearer ${env:FORTYGUARD_API_KEY}` and no hardcoded key. An earlier SDK session (`@modelcontextprotocol/sdk` 1.32.2) had already confirmed discovery and a free `credit_balance` call; this form answer focuses on the Cursor integration.

Initial Cursor launch failed authentication with HTTP 401 `invalid_token` because the Cursor process did not inherit `FORTYGUARD_API_KEY` from the project `.env`. After quitting Cursor and relaunching from a shell that sourced `.env` and exported the key, the `user-fortyguard` namespace connected successfully.

Through Cursor MCP I then:

- Executed `credit_balance` (Premium, 994,200 credits, cost 0).
- Discovered 12 namespace tools / 11 FortyGuard tools.
- Executed free `monitoring.list_monitors` (empty list, cost 0).
- Probed read/error paths on `heatmap_read`, `report_read`, and `temperature_routing_read`.

No paid analysis tools and no destructive monitoring operations were executed.

## How would you rate the MCP experience (1–10)?

**7 / 10**

Justification:

- Setup eventually works cleanly in Cursor, but the env-var inheritance requirement is easy to miss and produced a real 401 on first attempt.
- Once connected, tool discovery is strong and free tools (`credit_balance`, `list_monitors`) execute reliably with useful traces and zero cost.
- Error messages for unknown activity IDs are clear and actionable.
- Documentation quality holds the score down: published 9-tool catalogue vs live 11, Celsius/Fahrenheit conflict on reports, missing `wait_for_completion` in schemas, Street View angle semantics mismatch, and a monitoring tool that mixes free reads with destructive deletes.
- `list_alerts` is labeled free but failed with `invalid_input` in two attempts.
- Paid analysis capabilities remain untested by design (approval gate), so the rating reflects verified free/read paths plus contract quality, not end-to-end heat/route/imagery success.

## Did you face any issues during setup or usage?

Yes.

1. Cursor first returned HTTP 401 `invalid_token` until relaunched with `FORTYGUARD_API_KEY` in the process environment. Resolved; not persistent.
2. Published MCP catalogue omits live tools `credit_balance` and `monitoring`.
3. `monitoring.list_alerts` claimed free but returned `invalid_input`.
4. Docs/schema mismatches: report temperature unit; report analysis limits; Street View angle meaning; documented `wait_for_completion` absent live; `report_read` schema omits `activity_id` even though runtime accepts it.
5. Historical SDK handshake once returned HTTP 503 after initialize (earlier evidence); not reproduced in the Cursor session.

## What improvements would you suggest for the MCP?

Priority order:

1. Publish the live 11-tool catalogue and document which `monitoring` operations are free vs 3,500 credits, including that the same tool exposes deletes.
2. Align report temperature to one unit across docs, description, and schema; reconcile Premium “at most 2 analyses” with schema `maxItems: 5`.
3. Put `activity_id` on the `report_read` schema (runtime already accepts it) or remove the alias language; likewise align Street View heading/pitch docs with the live fields.
4. Fix or document required inputs for `list_alerts`; currently fails with only `operation` set.
5. Either implement `wait_for_completion` or remove it from the tools page; print the live credit numbers on the docs page.
6. Strengthen Cursor setup docs: export `FORTYGUARD_API_KEY` in the same shell that launches Cursor (project `.env` alone is insufficient for remote HTTP MCP).

## Overall MCP comments

FortyGuard MCP is usable from Cursor after correct environment setup. Free credit and monitor-list paths work, traces are informative, and invalid-ID errors are understandable. The main product gap is contract fidelity: agents cannot trust the published catalogue or several parameter descriptions without reading live schemas. With documentation aligned and `list_alerts` fixed, this would be a stronger agent integration. Paid analysis tools were intentionally not spent without approval, so this assessment does not claim those paths were runtime-validated.

## Supporting local evidence

- `evidence/mcp-fresh/complete-evaluation/`
- `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`
- `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`


---

## evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.json

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.json`

```json
{
  "timestamp_local": "2026-11-18T22:55:50+0530",
  "timestamp_utc": "2026-11-18T17:25:50Z",
  "mcp_namespace": "user-fortyguard",
  "form_source": "docs/12-final-feedback-form-draft.md / docs/27-final-feedback-question-coverage.md / docs/51-mcp-google-form-answers.md / PRODUCT_EVALUATION_TRACKER",
  "questions": [
    {
      "form_question": "Did you try the MCP? How did you set it up and which client did you use? (Form Q15 / tracker Q10\u201311)",
      "evidence_required": "Client name, config method, auth method, connection outcome",
      "test_required": "Cursor MCP setup + connectivity verification; reuse Phase B/C",
      "status": "complete"
    },
    {
      "form_question": "How would you rate the MCP experience (1\u201310)? (Form Q16 / tracker Q12)",
      "evidence_required": "Justified 1\u201310 based on setup, reliability, functionality, docs, DX",
      "test_required": "Functional free tests + discovery + UX assessment; paid gated",
      "status": "complete"
    },
    {
      "form_question": "Did you face any issues during setup or usage? (Form Q17 / tracker Q13)",
      "evidence_required": "Setup errors, auth failures, schema/doc mismatches, runtime issues",
      "test_required": "Record initial 401 recovery; free functional/error tests; doc comparison",
      "status": "complete"
    },
    {
      "form_question": "What improvements would you suggest for the MCP? (docs/51 + related form improvement prompts)",
      "evidence_required": "Evidence-backed prioritized recommendations",
      "test_required": "Docs vs live schema comparison + observed DX issues",
      "status": "complete"
    },
    {
      "form_question": "Whether connection and authentication worked",
      "evidence_required": "Namespace ready; Phase C success; env key present",
      "test_required": "Connectivity check; reuse Phase C credit_balance",
      "status": "complete"
    },
    {
      "form_question": "Whether MCP tools were discoverable",
      "evidence_required": "Live catalogue count and names",
      "test_required": "Reuse/confirm Phase D discovery",
      "status": "complete"
    },
    {
      "form_question": "Whether tools could actually execute",
      "evidence_required": "At least one successful Cursor MCP invocation; additional free ops if available",
      "test_required": "Phase C credit_balance + free monitoring list ops + safe error probes",
      "status": "complete"
    },
    {
      "form_question": "Whether functionality matched documentation",
      "evidence_required": "Confirmed discrepancies list",
      "test_required": "Phase D comparison + any runtime confirmation from free tests",
      "status": "complete"
    },
    {
      "form_question": "Overall MCP experience / additional comments if requested",
      "evidence_required": "Concise technical assessment",
      "test_required": "Synthesize after free tests; note untested paid scope",
      "status": "complete"
    }
  ],
  "planned_safe_executions": [
    {
      "tool": "monitoring",
      "operation": "list_monitors",
      "reason": "Live description says free",
      "cost_expected": 0
    },
    {
      "tool": "monitoring",
      "operation": "list_alerts",
      "reason": "Live description says free",
      "cost_expected": 0
    },
    {
      "tool": "heatmap_read",
      "operation": null,
      "reason": "Read with invalid id for error handling; described as non-creating read",
      "cost_expected": "expected 0 / unknown if charged"
    },
    {
      "tool": "report_read",
      "operation": null,
      "reason": "Read with invalid analytics_id; also probe activity_id alias claim",
      "cost_expected": "expected 0 / unknown if charged"
    },
    {
      "tool": "temperature_routing_read",
      "operation": null,
      "reason": "Read with invalid activity_id for error handling",
      "cost_expected": "expected 0 / unknown if charged"
    }
  ],
  "paid_approval_gate": "No paid analysis tools will be executed until explicit approval",
  "reuse": {
    "phase_c": "evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json",
    "phase_d": "evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json"
  },
  "completed_local": "2026-11-18T22:58:30+0530",
  "execution_summary": {
    "tools_executed_unique": [
      "credit_balance",
      "monitoring",
      "heatmap_read",
      "report_read",
      "temperature_routing_read"
    ],
    "successful_ops": [
      "credit_balance",
      "monitoring.list_monitors"
    ],
    "failed_ops_unexpected": [
      "monitoring.list_alerts",
      "monitoring.list_alerts+limit"
    ],
    "failed_ops_expected_validation_or_not_found": [
      "heatmap_read.invalid_id",
      "report_read.invalid_analytics_id",
      "report_read.activity_id_alias",
      "temperature_routing_read.invalid_id",
      "heatmap_read.empty",
      "monitoring.missing_operation"
    ],
    "paid_ops_executed": [],
    "destructive_ops_executed": [],
    "credits_spent_this_session": 0
  }
}
```


---

## evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.md

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.md`

# MCP requirement-to-test matrix

- Local start: `2026-11-18T22:55:50+0530`
- Local end: `2026-11-18T22:58:30+0530`
- Namespace: `user-fortyguard`
- Form sources: draft Q15–Q17 / tracker Q10–Q13 / docs/51

| Form question | Evidence required | Test required | Status |
| --- | --- | --- | --- |
| Did you try MCP? Setup + client | Cursor config, auth, connection | Phase B/C + connectivity recheck | complete |
| MCP rating 1–10 | Justified score | Free functional tests + UX synthesis | complete (7/10) |
| Setup/usage issues | Auth 401 recovery, mismatches, runtime errors | Recorded + free error probes | complete |
| Improvements | Prioritized evidence-backed recommendations | Docs vs live + DX | complete |
| Connection/auth worked | Namespace ready; Phase C success | Recheck + reuse Phase C | complete |
| Tools discoverable | Live catalogue | Reuse/confirm Phase D | complete |
| Tools can execute | Live Cursor invocations | Phase C + free monitoring + safe reads | complete |
| Functionality vs docs | Confirmed discrepancies | Phase D + runtime free probes | complete |
| Overall comments | Concise assessment | After free tests | complete |

## Executed safe operations

| Tool | Purpose | Outcome |
| --- | --- | --- |
| credit_balance (Phase C reuse) | Free baseline | success, cost 0 |
| monitoring.list_monitors | Free list | success, cost 0 |
| monitoring.list_alerts | Free list claim | invalid_input |
| heatmap_read / report_read / temperature_routing_read | Error handling | expected denials |
| report_read activity_id | Alias probe | runtime accepted |
| empty heatmap_read / monitoring | Validation | invalid_input |

## Paid gate

No paid analysis tools executed. `env_params` (2,900 credits) remains the primary approval candidate.


---

## evidence/mcp-fresh/complete-evaluation/mcp-tool-catalogue.json

Source path: `evidence/mcp-fresh/complete-evaluation/mcp-tool-catalogue.json`

```json
{
  "timestamp_local": "2026-11-18T22:55:50+0530",
  "timestamp_utc": "2026-11-18T17:25:50Z",
  "source": "Reused and reconfirmed via Cursor GetDynamicTools on user-fortyguard; schemas from Phase D capture",
  "namespace": "user-fortyguard",
  "namespace_status_at_recheck": "ready",
  "transport": "Streamable HTTP",
  "endpoint": "https://tos-mcp.app.fortyguard.com/mcp",
  "live_tool_count_including_cursor_helpers": 12,
  "live_fortyguard_tool_count": 11,
  "published_tool_count": 9,
  "tools": [
    {
      "name": "credit_balance",
      "description": "Read your available Enterprise API credits; free and read-only.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {}
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Description: free and read-only",
        "restrictions": []
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "env_params",
      "description": "Point-level environmental conditions for a single coordinate and date \u2014 e.g. provider-sourced apparent temperature, wet-bulb temperature, humidity, precipitation, and AQI, plus modeled clear-sky solar irradiance estimates (GHI, DNI, and DHI in W/m\u00b2). Provide the location's temperature in Celsius, supplied by the user or obtained from a reliable source. If it is unavailable, ask the user; never invent, assume, or silently substitute a temperature. heat_index_celsius is derived from this temperature and provider-sourced relative humidity. Use for a single location's numeric values, not area-wide maps or written reports. Historical temperature requests start at 2021-01-01; provider availability varies by location, date, and parameter. Future dates are unsupported. Paid: 2,110 credits on basic/startup, 2,900 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "temperature",
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "latitude": {
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "temperature": {
            "description": "Caller-supplied reference temperature in degrees Celsius. Used with provider-sourced relative humidity to calculate heat_index_celsius.",
            "title": "Temperature",
            "type": "number"
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "Start date in YYYY-MM-DD format",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End date in YYYY-MM-DD format",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "SegmentationDateTimeRange",
            "type": "object"
          },
          "analysis": {
            "anyOf": [
              {
                "items": {
                  "description": "Environmental measurements available for selection.",
                  "enum": [
                    "heat_index_celsius",
                    "apparent_temperature_celsius",
                    "wet_bulb_temperature_celsius",
                    "relative_humidity_percent",
                    "precipitation_mm",
                    "cloud_cover_octas",
                    "elevation_meters",
                    "aqi_us",
                    "aqi_us_pm25",
                    "aqi_us_pm10",
                    "aqi_us_no2",
                    "aqi_us_co",
                    "aqi_us_o3",
                    "aqi_us_so2",
                    "methane_ppb",
                    "co2_ppm",
                    "solar_irradiance"
                  ],
                  "title": "AnalysisField",
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Output fields to return; omitted uses the default set. Temperature fields are \u00b0C; humidity %, precipitation mm, cloud cover octas (0-8), elevation m, AQI fields US AQI index, methane ppb, CO2 ppm, and solar_irradiance clear-sky GHI/DNI/DHI in W/m\u00b2.",
            "title": "Analysis"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "temperature",
          "date_time"
        ],
        "title": "EnvParamsInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 2,110 credits on basic/startup, 2,900 on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "heatmap",
      "description": "Submit a standalone temperature or analytic heatmap for a polygon and local date window. start_time and end_time are HH:MM local wall times at the polygon AOI, not UTC; ambiguous or nonexistent DST times are rejected. A heatmap request can cover at most 31 calendar dates, counting both the start and end dates. For longer ranges, explain the limit and request approval before each separate paid submission. Exceedance counts sampled hours; persistence counts continuous sampled hours; thresholds are Celsius with strict above/below comparisons. Time of measure returns the maximum sample's UTC hour, using the earliest timestamp on ties. Returns status=processing and an activity_id immediately; use heatmap_read to retrieve the activity's processing, completed, or failed result. Historical temperature requests start at 2021-01-01; catalog availability varies by location and date. Paid: 3,500 credits on free/basic/startup, 4,220 on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "polygon_aoi",
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "polygon_aoi": {
            "additionalProperties": true,
            "description": "Closed GeoJSON Polygon, Feature or FeatureCollection; longitude then latitude",
            "title": "Polygon Aoi",
            "type": "object"
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "YYYY-MM-DD (historical temperature minimum 2021-01-01; catalog data is not guaranteed)",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "YYYY-MM-DD (required for filter_type 4)",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "HH:MM 24h local wall time at the polygon AOI, not UTC (filter_type 1/2). Ambiguous or nonexistent DST times are rejected.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "HH:MM 24h local wall time at the polygon AOI, not UTC (filter_type 2). Ambiguous or nonexistent DST times are rejected.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=one local hour; 2=same-day local hours (end exclusive for hour-aligned inputs); 3=one local day; 4=inclusive local date range, at most 31 calendar dates",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "EnterpriseDateTimeRange",
            "type": "object"
          },
          "granularity": {
            "default": 100,
            "description": "Heatmap output grid size in meters: 60, 80, or 100 (default 100). Smaller cells produce a finer map.",
            "enum": [
              60,
              80,
              100
            ],
            "title": "Granularity",
            "type": "integer"
          },
          "analytic_type": {
            "default": "tcm",
            "description": "tcm=temperature map (default); time_of_measure=peak temperature hour; exceedance=hours beyond threshold; persistence=continuous hours beyond threshold",
            "enum": [
              "tcm",
              "time_of_measure",
              "exceedance",
              "persistence"
            ],
            "title": "Analytic Type",
            "type": "string"
          },
          "threshold": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Celsius; defaults to 30 for exceedance/persistence",
            "title": "Threshold"
          },
          "direction": {
            "anyOf": [
              {
                "enum": [
                  "above",
                  "below"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Direction"
          },
          "idempotency_key": {
            "anyOf": [
              {
                "maxLength": 128,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Idempotency Key"
          },
          "map_type": {
            "default": "bm",
            "description": "Legacy Dashboard presentation code; accepted for compatibility but ignored by Enterprise/MCP heatmap execution. Use analytic_type to choose the analysis.",
            "enum": [
              "bm",
              "tcm",
              "tccm"
            ],
            "title": "Map Type",
            "type": "string"
          },
          "notify_by_email": {
            "default": false,
            "title": "Notify By Email",
            "type": "boolean"
          }
        },
        "required": [
          "polygon_aoi",
          "date_time"
        ],
        "additionalProperties": false,
        "description": "Inputs for generating a standalone temperature or analytic heatmap.",
        "title": "EnterpriseHeatmapInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 3,500 credits on free/basic/startup, 4,220 on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "heatmap_read",
      "description": "Read bounded persisted statistics from an existing temperature or analytic heatmap. Use for grounded questions about a heatmap already shown in Dashboard; does not create or modify a heatmap.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {
          "activity_id": {
            "anyOf": [
              {
                "minLength": 1,
                "pattern": "^\\S+$",
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Activity ID returned by heatmap; provide this or heatmap_id",
            "title": "Activity Id"
          },
          "heatmap_id": {
            "anyOf": [
              {
                "minLength": 1,
                "pattern": "^\\S+$",
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Compatibility alias for activity_id",
            "title": "Heatmap Id"
          }
        },
        "title": "EnterpriseHeatmapReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "mcp_auth",
      "description": "Authenticate this MCP server so its tools can be used.",
      "required_parameters": [],
      "input_schema": {
        "type": "object",
        "properties": {},
        "additionalProperties": false
      },
      "classification": {
        "operation_class": "client_auth",
        "read_write": "auth",
        "paid": false,
        "destructive": false,
        "cost_notes": "Cursor-injected auth helper; not a FortyGuard analysis tool",
        "restrictions": [
          "Cursor client surface"
        ]
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "monitoring",
      "description": "Recurring temperature monitors of a heatmap: list, read, create, update, delete or run one now; read its latest run, its alerts and their reports. list_monitors and list_alerts are free. All other operations cost 3,500 credits on premium. For a paid operation, show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "operation"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "operation": {
            "enum": [
              "create_monitor",
              "get_monitor",
              "list_monitors",
              "update_monitor",
              "delete_monitor",
              "get_latest_run",
              "trigger_forecast",
              "list_alerts",
              "get_alert",
              "get_alert_report",
              "download_alert_report",
              "list_runs",
              "get_run",
              "delete_heatmap_data"
            ],
            "title": "Operation",
            "type": "string"
          },
          "monitor_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Monitor Id"
          },
          "alert_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Alert Id"
          },
          "run_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Run Id"
          },
          "heatmap_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Heatmap Id"
          },
          "name": {
            "anyOf": [
              {
                "maxLength": 120,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Name"
          },
          "boundary_geojson": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Boundary Geojson"
          },
          "rules": {
            "anyOf": [
              {
                "items": {
                  "additionalProperties": false,
                  "properties": {
                    "temporal_aggregation": {
                      "enum": [
                        "minimum",
                        "average",
                        "maximum"
                      ],
                      "title": "Temporal Aggregation",
                      "type": "string"
                    },
                    "spatial_aggregation": {
                      "enum": [
                        "minimum",
                        "maximum"
                      ],
                      "title": "Spatial Aggregation",
                      "type": "string"
                    },
                    "operator": {
                      "enum": [
                        "above",
                        "below",
                        "within_interval"
                      ],
                      "title": "Operator",
                      "type": "string"
                    },
                    "unit": {
                      "enum": [
                        "celsius",
                        "fahrenheit"
                      ],
                      "title": "Unit",
                      "type": "string"
                    },
                    "threshold": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Threshold"
                    },
                    "lower_bound": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Lower Bound"
                    },
                    "upper_bound": {
                      "anyOf": [
                        {
                          "type": "number"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Upper Bound"
                    }
                  },
                  "required": [
                    "temporal_aggregation",
                    "spatial_aggregation",
                    "operator",
                    "unit"
                  ],
                  "title": "MonitorRuleInput",
                  "type": "object"
                },
                "maxItems": 20,
                "minItems": 1,
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Rules"
          },
          "notifications": {
            "anyOf": [
              {
                "additionalProperties": false,
                "properties": {
                  "email": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Email",
                    "type": "array"
                  },
                  "sms": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Sms",
                    "type": "array"
                  },
                  "whatsapp": {
                    "items": {
                      "type": "string"
                    },
                    "maxItems": 20,
                    "title": "Whatsapp",
                    "type": "array"
                  }
                },
                "title": "MonitorNotifications",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Required for create_monitor: include at least one email, sms, or whatsapp destination."
          },
          "enabled": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Enabled"
          },
          "generate_report": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Generate Report"
          },
          "file_type": {
            "anyOf": [
              {
                "enum": [
                  "pdf",
                  "docx"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "File Type"
          },
          "cursor": {
            "anyOf": [
              {
                "maxLength": 512,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Cursor"
          },
          "limit": {
            "anyOf": [
              {
                "maximum": 100,
                "minimum": 1,
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Limit"
          },
          "status": {
            "anyOf": [
              {
                "maxLength": 64,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Status"
          }
        },
        "required": [
          "operation"
        ],
        "additionalProperties": false,
        "title": "MonitoringInput"
      },
      "classification": {
        "operation_class": "mixed",
        "read_write": "mixed",
        "paid": true,
        "destructive": true,
        "cost_notes": "list_monitors and list_alerts free; other operations 3,500 credits on premium",
        "restrictions": [
          "Includes delete_monitor and delete_heatmap_data",
          "Ask confirmation before paid ops"
        ],
        "operations": [
          "create_monitor",
          "get_monitor",
          "list_monitors",
          "update_monitor",
          "delete_monitor",
          "get_latest_run",
          "trigger_forecast",
          "list_alerts",
          "get_alert",
          "get_alert_report",
          "download_alert_report",
          "list_runs",
          "get_run",
          "delete_heatmap_data"
        ]
      },
      "in_published_catalogue": false,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "report",
      "description": "Submit a heat-intelligence report for a point and date. Provide the point temperature in degrees Fahrenheit (\u00b0F). Returns status=processing and an activity_id immediately; use report_read to retrieve the activity's processing, completed, or failed result. Premium permits at most 2 analysis types per report; select 1 or 2. Historical temperature requests start at 2021-01-01; historical weather and other source availability varies by location and date. Reports can take several minutes; poll report_read with the returned activity_id. Paid: 6,300 credits on free, 8,600 on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "temperature",
        "date",
        "analysis"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "polygon": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Dashboard report area polygon",
            "title": "Polygon"
          },
          "report_polygon": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Explicit enriched Dashboard tile polygon",
            "title": "Report Polygon"
          },
          "selected_heat_intelligence_tile_id": {
            "anyOf": [
              {
                "maxLength": 256,
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Selected Heat Intelligence Tile Id"
          },
          "date_time": {
            "anyOf": [
              {
                "properties": {
                  "start_date": {
                    "description": "Start date in YYYY-MM-DD format",
                    "title": "Start Date",
                    "type": "string"
                  },
                  "end_date": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End date in YYYY-MM-DD format",
                    "title": "End Date"
                  },
                  "start_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "Start Time"
                  },
                  "end_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "End Time"
                  },
                  "filter_type": {
                    "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                    "enum": [
                      1,
                      2,
                      3,
                      4
                    ],
                    "title": "Filter Type",
                    "type": "integer"
                  }
                },
                "required": [
                  "start_date",
                  "filter_type"
                ],
                "title": "SegmentationDateTimeRange",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "granularity": {
            "default": 100,
            "title": "Granularity",
            "type": "integer"
          },
          "notify_by_email": {
            "default": false,
            "title": "Notify By Email",
            "type": "boolean"
          },
          "latitude": {
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "temperature": {
            "description": "Point temperature in degrees Fahrenheit (\u00b0F)",
            "title": "Temperature",
            "type": "number"
          },
          "date": {
            "description": "YYYY-MM-DD, past or present only",
            "title": "Date",
            "type": "string"
          },
          "analysis": {
            "description": "1-5 of: geographic, environmental, urban, events, anthropogenic. Enterprise Premium allows at most 2 per report.",
            "items": {
              "enum": [
                "geographic",
                "environmental",
                "urban",
                "events",
                "anthropogenic"
              ],
              "title": "ReportAnalysis",
              "type": "string"
            },
            "maxItems": 5,
            "minItems": 1,
            "title": "Analysis",
            "type": "array"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "temperature",
          "date",
          "analysis"
        ],
        "title": "ReportInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 6,300 credits on free, 8,600 on premium.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "report_read",
      "description": "Read an existing completed Heat Intelligence report without generating a new report.",
      "required_parameters": [
        "analytics_id"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "minLength": 1,
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Dashboard heatmap context; required only for Dashboard reads.",
            "title": "Heatmap Id"
          },
          "analytics_id": {
            "description": "Report activity identifier returned by report; activity_id is an accepted input alias.",
            "minLength": 1,
            "pattern": "^\\S+$",
            "title": "Analytics Id",
            "type": "string"
          }
        },
        "required": [
          "analytics_id"
        ],
        "additionalProperties": false,
        "title": "EnterpriseReportReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "satellite",
      "description": "Segment a satellite image for a point into land-cover classes. Use for overhead imagery; use streetview for ground-level imagery. Shared accepts request dates from 2019-01-01; Enterprise's configured minimum may differ, and imagery availability varies by location and capture date. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 14,400 credits on premium. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "date_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "tiles": {
            "anyOf": [
              {},
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Selected tile or polygon for Dashboard segmentation",
            "title": "Tiles"
          },
          "big_area": {
            "default": false,
            "description": "Dashboard polygon mode only; Enterprise/MCP point requests ignore this flag. Default false.",
            "title": "Big Area",
            "type": "boolean"
          },
          "sat": {
            "anyOf": [
              {
                "properties": {
                  "latitude": {
                    "description": "Latitude in decimal degrees (-90 to 90)",
                    "maximum": 90,
                    "minimum": -90,
                    "title": "Latitude",
                    "type": "number"
                  },
                  "longitude": {
                    "description": "Longitude in decimal degrees (-180 to 180)",
                    "maximum": 180,
                    "minimum": -180,
                    "title": "Longitude",
                    "type": "number"
                  }
                },
                "required": [
                  "latitude",
                  "longitude"
                ],
                "title": "SatellitePointInput",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "date_time": {
            "properties": {
              "start_date": {
                "description": "Start date in YYYY-MM-DD format",
                "title": "Start Date",
                "type": "string"
              },
              "end_date": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End date in YYYY-MM-DD format",
                "title": "End Date"
              },
              "start_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "Start Time"
              },
              "end_time": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                "title": "End Time"
              },
              "filter_type": {
                "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                "enum": [
                  1,
                  2,
                  3,
                  4
                ],
                "title": "Filter Type",
                "type": "integer"
              }
            },
            "required": [
              "start_date",
              "filter_type"
            ],
            "title": "SegmentationDateTimeRange",
            "type": "object"
          },
          "granularity": {
            "default": 100,
            "description": "Point imagery buffer radius in meters: 60, 80, or 100 (default 100).",
            "enum": [
              60,
              80,
              100
            ],
            "title": "Granularity",
            "type": "integer"
          }
        },
        "required": [
          "date_time"
        ],
        "title": "SatelliteSegmentationInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 14,400 credits on premium.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "streetview",
      "description": "Segment street-view imagery for a point into visible urban classes. Use for ground-level front/back views; use satellite for overhead imagery. Street View availability and image capture dates vary by location; a supplied date is not an imagery guarantee. MCP results omit embedded images; segmentation classes, legend, dates, and metadata remain available. Paid: 8,600 credits on premium/hackathon. Show the user the exact parameters and expected credit cost, and ask for confirmation before execution. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "latitude",
        "longitude",
        "vertical_angle",
        "horizontal_angle",
        "back_view"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "heatmap_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Existing Dashboard heatmap reference",
            "title": "Heatmap Id"
          },
          "date_time": {
            "anyOf": [
              {
                "properties": {
                  "start_date": {
                    "description": "Start date in YYYY-MM-DD format",
                    "title": "Start Date",
                    "type": "string"
                  },
                  "end_date": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End date in YYYY-MM-DD format",
                    "title": "End Date"
                  },
                  "start_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Start time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "Start Time"
                  },
                  "end_time": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "End time in HH:MM 24h format, local to the requested coordinates; the timezone is inferred.",
                    "title": "End Time"
                  },
                  "filter_type": {
                    "description": "1=single hour, 2=range of hours, 3=single day, 4=range of days (week/month, <=1 month)",
                    "enum": [
                      1,
                      2,
                      3,
                      4
                    ],
                    "title": "Filter Type",
                    "type": "integer"
                  }
                },
                "required": [
                  "start_date",
                  "filter_type"
                ],
                "title": "SegmentationDateTimeRange",
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "latitude": {
            "description": "Latitude in decimal degrees (-90 to 90)",
            "maximum": 90,
            "minimum": -90,
            "title": "Latitude",
            "type": "number"
          },
          "longitude": {
            "description": "Longitude in decimal degrees (-180 to 180)",
            "maximum": 180,
            "minimum": -180,
            "title": "Longitude",
            "type": "number"
          },
          "vertical_angle": {
            "description": "Street View heading in degrees; the back view, when requested, uses heading + 180\u00b0. No input range is enforced.",
            "title": "Vertical Angle",
            "type": "number"
          },
          "horizontal_angle": {
            "description": "Street View pitch control, 0-360; Engine divides this value by 100 before sending pitch in degrees (e.g. 100 gives 1\u00b0).",
            "maximum": 360,
            "minimum": 0,
            "title": "Horizontal Angle",
            "type": "number"
          },
          "back_view": {
            "description": "Also request an image facing 180\u00b0 opposite the supplied heading.",
            "title": "Back View",
            "type": "boolean"
          }
        },
        "required": [
          "latitude",
          "longitude",
          "vertical_angle",
          "horizontal_angle",
          "back_view"
        ],
        "title": "StreetViewSegmentationInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "execute",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 8,600 credits on premium/hackathon.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "temperature_routing",
      "description": "Submit temperature-aware route generation between two coordinate locations at a departure time. Returns status=processing and an activity_id immediately; use temperature_routing_read to retrieve the activity's processing, completed, or failed result. The current graph is built from a driving-road network; travel mode cannot be selected. Routing supports the contiguous United States only. Route and temperature-source availability varies by location and departure time; no universal historical start date is promised. Paid: 3,500 credits on all entitled plans. Show the user the exact parameters and expected credit cost, and ask for confirmation before submission. FortyGuard currently provides data only for supported regions within the United States. Requests outside supported U.S. coverage are not allowed. Availability within the United States also depends on the tool, location, date, and underlying data coverage.",
      "required_parameters": [
        "origin",
        "destination",
        "departure_time"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "origin": {
            "additionalProperties": false,
            "description": "Route endpoint coordinates in decimal latitude and longitude.",
            "properties": {
              "lat": {
                "maximum": 90,
                "minimum": -90,
                "title": "Lat",
                "type": "number"
              },
              "lon": {
                "maximum": 180,
                "minimum": -180,
                "title": "Lon",
                "type": "number"
              }
            },
            "required": [
              "lat",
              "lon"
            ],
            "title": "RoutingCoordinates",
            "type": "object"
          },
          "destination": {
            "additionalProperties": false,
            "description": "Route endpoint coordinates in decimal latitude and longitude.",
            "properties": {
              "lat": {
                "maximum": 90,
                "minimum": -90,
                "title": "Lat",
                "type": "number"
              },
              "lon": {
                "maximum": 180,
                "minimum": -180,
                "title": "Lon",
                "type": "number"
              }
            },
            "required": [
              "lat",
              "lon"
            ],
            "title": "RoutingCoordinates",
            "type": "object"
          },
          "departure_time": {
            "description": "ISO-8601 departure date-time. Include Z or an offset for an absolute instant (e.g. 2026-08-23T13:00:00Z); without an offset, Engine treats it as local wall time using the route tile's UTC offset, which may be approximate near DST.",
            "minLength": 1,
            "title": "Departure Time",
            "type": "string"
          }
        },
        "required": [
          "origin",
          "destination",
          "departure_time"
        ],
        "additionalProperties": false,
        "title": "TemperatureRoutingInput"
      },
      "classification": {
        "operation_class": "paid_analysis",
        "read_write": "write",
        "paid": true,
        "destructive": false,
        "cost_notes": "Paid: 3,500 credits on all entitled plans.",
        "restrictions": [
          "US coverage limits",
          "Ask confirmation before execution"
        ]
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    },
    {
      "name": "temperature_routing_read",
      "description": "Read an existing temperature-aware routing activity without generating routes again.",
      "required_parameters": [
        "activity_id"
      ],
      "input_schema": {
        "type": "object",
        "properties": {
          "activity_id": {
            "minLength": 1,
            "pattern": "^\\S+$",
            "title": "Activity Id",
            "type": "string"
          }
        },
        "required": [
          "activity_id"
        ],
        "additionalProperties": false,
        "title": "TemperatureRoutingReadInput"
      },
      "classification": {
        "operation_class": "read",
        "read_write": "read",
        "paid": false,
        "destructive": false,
        "cost_notes": "Described as read of existing activity/result; no paid language in description",
        "restrictions": []
      },
      "in_published_catalogue": true,
      "source_note": "Cursor MCP tool discovery via GetDynamicTools on user-fortyguard"
    }
  ],
  "catalogue_comparison": {
    "published_vs_live_fortyguard": "9 published vs 11 live FortyGuard tools",
    "historical_9_vs_11_still_holds": true,
    "additional_live_fortyguard_tools": [
      "credit_balance",
      "monitoring"
    ],
    "new_since_sdk_discovery": [],
    "cursor_namespace_extra": [
      "mcp_auth"
    ],
    "note": "mcp_auth is exposed in the Cursor MCP namespace as an authentication helper; it is not part of the published FortyGuard MCP catalogue and was not present in the earlier SDK tools/list evidence."
  }
}
```


# Section 4 — Captured MCP documentation pages (`evidence/mcp-fresh/documentation/`)


---

## evidence/mcp-fresh/documentation/index.json

Source path: `evidence/mcp-fresh/documentation/index.json`

```json
[
  {
    "route": "/docs/mcp-overview",
    "status": 200,
    "h1": "FortyGuard MCP",
    "chars": 2511
  },
  {
    "route": "/docs/mcp-quickstart",
    "status": 200,
    "h1": "MCP Quickstart",
    "chars": 2644
  },
  {
    "route": "/docs/mcp-authentication",
    "status": 200,
    "h1": "MCP Authentication",
    "chars": 2261
  },
  {
    "route": "/docs/mcp-tools",
    "status": 200,
    "h1": "Available MCP Tools",
    "chars": 11140
  },
  {
    "route": "/docs/mcp-client-setup",
    "status": 200,
    "h1": "MCP Client Setup",
    "chars": 3681
  },
  {
    "route": "/docs/mcp-troubleshooting",
    "status": 200,
    "h1": "MCP Troubleshooting",
    "chars": 7926
  }
]
```


---

## evidence/mcp-fresh/documentation/mcp-authentication.md

Source path: `evidence/mcp-fresh/documentation/mcp-authentication.md`

# /docs/mcp-authentication

Captured: 2026-11-18T16:24:37.247Z
HTTP 200
Elapsed ms: 31557
H1: MCP Authentication

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
MCP Authentication

Authenticate MCP requests using your FortyGuard API key.

Authentication header

FortyGuard MCP uses Bearer authentication. Your MCP client must include your FortyGuard API key in the Authorization header when connecting to the MCP endpoint.

Authorization: Bearer <FORTYGUARD_API_KEY>
Copy
MCP vs REST API authentication

The FortyGuard REST API documentation may show API-key authentication using an api-key header. MCP connections use the Bearer authorization format shown above.

Interface	Header format
REST API	api-key: YOUR_API_KEY
FortyGuard MCP	Authorization: Bearer <FORTYGUARD_API_KEY>
Secure key handling
Store keys in environment variables or your client's secure secret or configuration mechanism.
Do not commit API keys to source control.
Do not put API keys in prompts or send them as tool arguments.
Avoid sharing screenshots or logs containing secrets.
Rotate a key if it is exposed.
Example environment variable
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
Authorization: Bearer $FORTYGUARD_API_KEY
Copy

Shell and client interpolation syntax differs between clients.

Access and usage

Available MCP capabilities and usage are governed by the FortyGuard account and API subscription associated with the API key.

Authentication errors

Authentication can fail when an API key is missing, invalid, expired, revoked, or does not have access to the requested capability. Verify that your client is sending the Authorization header using the Bearer format and that the API key is active.

On this page
Authentication header
MCP vs REST API authentication
Secure key handling
Example environment variable
Access and usage
Authentication errors
PREVIOUS
MCP Quickstart
NEXT
Available Tools


---

## evidence/mcp-fresh/documentation/mcp-client-setup.md

Source path: `evidence/mcp-fresh/documentation/mcp-client-setup.md`

# /docs/mcp-client-setup

Captured: 2026-11-18T16:25:40.355Z
HTTP 200
Elapsed ms: 31554
H1: MCP Client Setup

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
MCP Client Setup

Connect FortyGuard MCP to a compatible AI client using your FortyGuard API key.

FortyGuard MCP can be used from clients that support remote Model Context Protocol servers. The configurations below have been validated with OpenAI Codex CLI, Cursor, and Claude Code.

Connection Details
Endpoint
https://tos-mcp.app.fortyguard.com/mcp
Authentication
Authorization: Bearer <FORTYGUARD_API_KEY>
Transport
Remote MCP over HTTP / Streamable HTTP
Requirements
A valid FortyGuard API key.
An MCP-compatible client.
Network access to the FortyGuard MCP endpoint.
Keep your API key private. Prefer environment variables or your client's secure configuration mechanism. Never commit API keys to source control.
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
OpenAI Codex CLI
CLI

Codex can connect to FortyGuard as a remote MCP server.

1. Set environment variables
export FORTYGUARD_API_KEY='your_api_key_here'
export FORTYGUARD_AUTH_HEADER="Bearer $FORTYGUARD_API_KEY"
Copy
2. Configure Codex MCP

Edit ~/.codex/config.toml and add:

[mcp_servers.fortyguard]
url = "https://tos-mcp.app.fortyguard.com/mcp"
enabled = true
env_http_headers = { Authorization = "FORTYGUARD_AUTH_HEADER" }
startup_timeout_sec = 30
tool_timeout_sec = 120
Copy
3. Verify
codex mcp list
Copy

Inside Codex, use /mcp and confirm that fortyguard is connected and its tools are available.

Cursor
AI IDE

Cursor can connect to FortyGuard using a remote MCP configuration.

1. Set environment variable
export FORTYGUARD_API_KEY='your_api_key_here'
Copy

Ensure Cursor can access the environment variable. When testing locally, launching Cursor from the same shell is one way to ensure it inherits the environment.

2. Configure Cursor

Edit ~/.cursor/mcp.json. If it already contains other MCP servers, add the fortyguard entry instead of replacing the existing configuration.

{
  "mcpServers": {
    "fortyguard": {
      "url": "https://tos-mcp.app.fortyguard.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:FORTYGUARD_API_KEY}"
      }
    }
  }
}
Copy
3. Verify

Open Cursor's MCP settings and confirm that fortyguard is connected and its tools are available to the Agent.

Claude Code
CLI

Claude Code supports remote HTTP MCP servers.

1. Set API key
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
2. Add MCP server
claude mcp add --transport http fortyguard \
  https://tos-mcp.app.fortyguard.com/mcp \
  --header "Authorization: Bearer $FORTYGUARD_API_KEY"
Copy
3. Verify
claude mcp list
claude mcp get fortyguard
claude
Copy

Inside Claude Code, use /mcp to verify that FortyGuard is connected. Claude Code may display MCP tools using a server-prefixed tool name.

Test your connection
Get environmental conditions for latitude 33.4484, longitude -112.074, for September 20, 2025 using a reference temperature of 35 °C.

Your client should discover FortyGuard tools, choose env_params, and return structured environmental data.

Having trouble connecting? See MCP Troubleshooting.

On this page
Connection Details
Requirements
OpenAI Codex CLI
Cursor
Claude Code
Test your connection
PREVIOUS
Available Tools
NEXT
Troubleshooting


---

## evidence/mcp-fresh/documentation/mcp-overview.md

Source path: `evidence/mcp-fresh/documentation/mcp-overview.md`

# /docs/mcp-overview

Captured: 2026-11-18T16:23:34.117Z
HTTP 200
Elapsed ms: 34174
H1: FortyGuard MCP

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
FortyGuard MCP

Connect AI assistants and agents directly to FortyGuard's heat, environmental, geospatial, and temperature-intelligence capabilities through the Model Context Protocol (MCP).

What is FortyGuard MCP?

FortyGuard MCP is a Model Context Protocol interface for using FortyGuard capabilities from compatible AI clients and agent workflows.

Instead of manually integrating individual API requests into an AI application, an MCP-compatible client can discover available FortyGuard tools, select the appropriate capability, provide validated inputs, and work with the returned results.

What can you do with it?
Retrieve environmental conditions for a location.
Generate heatmaps for an area and retrieve completed heatmap results and statistics.
Generate and retrieve Heat Intelligence reports.
Analyze satellite imagery and street-view imagery.
Generate temperature-aware routes and retrieve completed routing results.
How it works
Compatible AI Client
→
FortyGuard MCP
→
FortyGuard capabilities

Your MCP client connects to the FortyGuard MCP endpoint using your FortyGuard API key. The client can discover the available tools and invoke the appropriate capability based on your request.

Asynchronous workflows

Some analyses can take longer to complete. These operations return an activity identifier and can be checked later using the corresponding read tool.

heatmap → heatmap_read
report → report_read
temperature_routing → temperature_routing_read
Compatible clients

FortyGuard MCP works with compatible MCP clients. The integration has been validated with OpenAI Codex CLI, Cursor, and Claude Code.

Getting started

Continue to the MCP Quickstart to connect a client, configure Client Setup, explore Available Tools, or review MCP Authentication before configuring your API key.

On this page
What is FortyGuard MCP?
What can you do with it?
How it works
Asynchronous workflows
Compatible clients
Getting started
PREVIOUS
Authentication
NEXT
MCP Quickstart


---

## evidence/mcp-fresh/documentation/mcp-quickstart.md

Source path: `evidence/mcp-fresh/documentation/mcp-quickstart.md`

# /docs/mcp-quickstart

Captured: 2026-11-18T16:24:05.689Z
HTTP 200
Elapsed ms: 31569
H1: MCP Quickstart

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
MCP Quickstart

Connect an MCP-compatible AI client to FortyGuard and make your first request.

Get a FortyGuard API key

FortyGuard MCP uses your FortyGuard API key for authentication. If you already use the FortyGuard API, use the API key associated with the account and subscription you want to access.

See API Authentication for information about obtaining and managing an API key. MCP uses a different HTTP header format, described below.

Store the key securely
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
Do not commit your API key to source control or include it directly in prompts.
Connection details
Transport	Remote MCP over HTTP / Streamable HTTP
Endpoint	https://tos-mcp.app.fortyguard.com/mcp
Authentication	Authorization: Bearer <FORTYGUARD_API_KEY>
Configure your MCP client

Add FortyGuard as a remote MCP server in your MCP-compatible client. Configure the FortyGuard MCP endpoint and send your API key using the Authorization Bearer header.

Conceptual MCP configuration
{
  "url": "https://tos-mcp.app.fortyguard.com/mcp",
  "headers": {
    "Authorization": "Bearer <FORTYGUARD_API_KEY>"
  }
}
Copy

Configuration syntax differs between MCP clients.

Verify the connection

After connecting, your client should discover the FortyGuard MCP tool catalog. The current catalog contains nine tools:

env_params
heatmap
heatmap_read
report
report_read
satellite
streetview
temperature_routing
temperature_routing_read
Make your first request
Get the environmental conditions for Phoenix, Arizona at latitude 33.4484 and longitude -112.074 for September 20, 2025, using a reference temperature of 35 °C.

The MCP client should select the environmental-parameters capability and return structured FortyGuard data.

Next steps

Review MCP Authentication for key-handling guidance, Client Setup to configure a compatible client, or Available Tools to choose a FortyGuard capability.

On this page
Get a FortyGuard API key
Store the key securely
Connection details
Configure your MCP client
Verify the connection
Make your first request
Next steps
PREVIOUS
MCP Overview
NEXT
MCP Authentication


---

## evidence/mcp-fresh/documentation/mcp-tools.md

Source path: `evidence/mcp-fresh/documentation/mcp-tools.md`

# /docs/mcp-tools

Captured: 2026-11-18T16:25:08.799Z
HTTP 200
Elapsed ms: 31551
H1: Available MCP Tools

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Available MCP Tools

FortyGuard MCP exposes tools for environmental conditions, heat analysis, imagery segmentation, reporting, and temperature-aware routing. MCP clients can discover these tools automatically and select the appropriate capability based on the user's request.

Tool workflow summary
Direct analysis

env_params, satellite, and streetview return results for the submitted request.

Asynchronous analysis

heatmap
→
heatmap_read

report
→
report_read

temperature_routing
→
temperature_routing_read

Asynchronous submit tools return a status and activity identifier. Use the corresponding read tool later to retrieve a processing, completed, or failed result.

Tool	Purpose	Behavior
env_params	Retrieve point-level environmental conditions and raw measurements for a single coordinate and date/time.	DIRECT
heatmap	Generate a temperature heatmap for a geographic area.	ASYNC
heatmap_read	Retrieve the status and persisted statistics for an existing heatmap activity.	READ
report	Generate a Heat Intelligence report for a location and selected analyses.	ASYNC
report_read	Check an existing Heat Intelligence report and retrieve its generated report result when complete.	READ
satellite	Analyze satellite imagery for a location and return semantic segmentation information.	DIRECT
streetview	Analyze street-level imagery and return semantic segmentation information.	DIRECT
temperature_routing	Generate route alternatives using travel time and thermal exposure information.	ASYNC
temperature_routing_read	Retrieve an existing temperature-aware routing activity.	READ
Jump to a tool
01
Environmental Parameters
02
Create Heatmap
03
Read Heatmap Result
04
Heat Intelligence Report
05
Read Report Result
06
Satellite View Segmentation
07
Street View Segmentation
08
Temperature-Aware Routing
09
Read Temperature Routing Result
01
Environmental Parameters
env_params
DIRECT
Purpose

Retrieve point-level environmental conditions and raw measurements for a single coordinate and date/time.

When to use

Use this when a user needs environmental readings for one specific location rather than an area-wide heatmap or a report.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
temperature — Reference temperature.
date_time — Date/time selection; single-hour, range-of-hours, and single-day filters are supported.
analysis — Optional list of supported environmental measurements to return.
Example request
Get the environmental conditions for Phoenix at latitude 33.4484 and longitude -112.074 for September 20, 2025 using a reference temperature of 35 °C.
Important output
Environmental measurements such as apparent temperature, wet-bulb temperature, relative humidity, precipitation, cloud cover, air quality, and solar irradiance when available.
Usage and limitations: Values and available parameters depend on the requested location, date, plan, and available data.
02
Create Heatmap
heatmap
ASYNC
Purpose

Generate a temperature heatmap for a geographic area.

When to use

Use this for area-level temperature and heat analysis rather than a single point reading.

Key inputs
polygon_aoi — GeoJSON-style polygon area of interest for a base heatmap.
date_time — Date/time selection for a base heatmap.
granularity — Optional spatial granularity: 60, 80, or 100 metres; defaults to 100.
analytic_type — Optional analysis type: tcm, time_of_measure, exceedance, or persistence.
map_type — Optional map type: bm, tcm, or tccm.
wait_for_completion — Optional flag to wait for the completed result in the MCP response.
Example request
Generate a heatmap for this polygon for September 20, 2025 at granularity 100.
Important output
An accepted activity identifier while processing, or completed heatmap statistics when waiting for completion.
Async workflow
heatmap → heatmap_read
By default, heatmap creation returns a processing status and activity identifier. Use heatmap_read to retrieve the completed statistics.
Related tool: heatmap_read
Usage and limitations: Generating a new heatmap may consume usage or credits. Availability and usage depend on your FortyGuard API plan.
03
Read Heatmap Result
heatmap_read
READ
Purpose

Retrieve the status and persisted statistics for an existing heatmap activity.

When to use

Use this after heatmap returns a heatmap activity identifier.

Key inputs
heatmap_id — The existing heatmap activity identifier.
Example request
Retrieve the result for heatmap activity hm_123.
Important output
Processing, completed, or failed status.
Temperature unit, temperature statistics, and mean temperature when completed.
Related tool: heatmap
Usage and limitations: This reads existing work and does not create a new heatmap.
04
Heat Intelligence Report
report
ASYNC
Purpose

Generate a Heat Intelligence report for a location and selected analyses.

When to use

Use this when a user needs a written, report-style analysis rather than only raw measurements.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
temperature — Reference temperature in degrees Celsius.
date — Past or present date in YYYY-MM-DD format.
analysis — One to five selections from geographic, environmental, urban, events, and anthropogenic.
wait_for_completion — Optional flag to wait for the completed report in the MCP response.
Example request
Generate a Heat Intelligence report for this location using geographic and environmental analysis.
Important output
An activity identifier while processing, or a report link when the report is complete.
Async workflow
report → report_read
By default, report returns an activity identifier. Use report_read to check the existing report and retrieve its result.
Related tool: report_read
Usage and limitations: Report generation may consume usage or credits. Availability and usage depend on your FortyGuard API plan.
05
Read Report Result
report_read
READ
Purpose

Check an existing Heat Intelligence report and retrieve its generated report result when complete.

When to use

Use this after report returns its report activity identifier.

Key inputs
analytics_id — The report identifier returned by report. The tool also accepts this identifier as activity_id.
Example request
Retrieve the completed Heat Intelligence report for the report activity identifier.
Important output
Processing, completed, or failed status.
A signed report URL and, when available, a document URL or bounded report sections.
Related tool: report
Usage and limitations: Completed report links may be temporary. Request the result again if a link has expired.
06
Satellite View Segmentation
satellite
DIRECT
Purpose

Analyze satellite imagery for a location and return semantic segmentation information.

When to use

Use this when a user needs land-cover or visual-environment context from overhead imagery.

Key inputs
sat — A point with latitude and longitude, or tiles for a selected tile or polygon target.
date_time — Required date/time selection; range-of-days is not supported.
granularity — Optional granularity: 60, 80, or 100 metres; defaults to 100.
big_area — Optional flag for applicable larger-area requests.
Example request
Analyze satellite imagery at this coordinate and return the segmentation percentages.
Important output
Segmentation classes and class percentages.
Imagery metadata and supported image or segmentation artifacts.
Usage and limitations: Returned imagery represents available imagery selected for the request and may not exactly match the requested date.
07
Street View Segmentation
streetview
DIRECT
Purpose

Analyze street-level imagery and return semantic segmentation information.

When to use

Use this when a user needs ground-level visual context for a location.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
vertical_angle — Required vertical viewing angle.
horizontal_angle — Required horizontal pan angle from 0 to 360 degrees.
back_view — Required flag to include an optional back-view result.
date_time — Optional date/time selection.
Example request
Analyze the street-view image at this location using a forward-facing view.
Important output
Front-view segmentation and optional back-view result.
Semantic classes, class percentages, imagery metadata, and image date when available.
Usage and limitations: Street-view imagery availability and date depend on available imagery for the requested location. Segmentation labels are estimates, not guaranteed semantic truth.
08
Temperature-Aware Routing
temperature_routing
ASYNC
Purpose

Generate route alternatives using travel time and thermal exposure information.

When to use

Use this when routing should consider temperature and heat exposure rather than only shortest or fastest travel.

Key inputs
origin — Required latitude/longitude coordinate pair.
destination — Required latitude/longitude coordinate pair, different from the origin.
departure_time — Required ISO-8601 date-time.
wait_for_completion — Optional flag to wait for the completed result in the MCP response.
Example request
Find temperature-aware routes from this origin to this destination for the requested departure time.
Important output
An activity identifier while processing, or route alternatives when completed.
Async workflow
temperature_routing → temperature_routing_read
By default, routing returns a processing status and activity identifier. Use temperature_routing_read to retrieve the completed routes.
Related tool: temperature_routing_read
Usage and limitations: Availability depends on routing coverage and supported thermal data and time windows.
09
Read Temperature Routing Result
temperature_routing_read
READ
Purpose

Retrieve an existing temperature-aware routing activity.

When to use

Use this after temperature_routing returns an activity identifier.

Key inputs
activity_id — The existing routing activity identifier.
Example request
Retrieve the result for this temperature-aware routing activity.
Important output
Processing, completed, or failed status.
One or more routes with GeoJSON geometry, distance, duration, thermal metrics, route preference metadata, and the selected route.
Related tool: temperature_routing
Usage and limitations: This reads existing routing work and does not start a new routing calculation.
On this page
Tool workflow summary
Jump to a tool
Environmental Parameters
Create Heatmap
Read Heatmap Result
Heat Intelligence Report
Read Report Result
Satellite View Segmentation
Street View Segmentation
Temperature-Aware Routing
Read Temperature Routing Result
PREVIOUS
MCP Authentication
NEXT
Client Setup


---

## evidence/mcp-fresh/documentation/mcp-troubleshooting.md

Source path: `evidence/mcp-fresh/documentation/mcp-troubleshooting.md`

# /docs/mcp-troubleshooting

Captured: 2026-11-18T16:26:11.912Z
HTTP 200
Elapsed ms: 31557
H1: MCP Troubleshooting

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
MCP Troubleshooting

Resolve common connection, authentication, tool execution, and result-retrieval issues when using FortyGuard MCP.

Most MCP issues fall into a few categories: client configuration, authentication, invalid inputs, asynchronous processing, coverage or data availability, and account access. Use the checks below before retrying a request.

Start here
Confirm the MCP endpoint is correct.
Confirm your FortyGuard API key is available to the client.
Confirm the client shows FortyGuard as connected.
Confirm the expected FortyGuard tools are visible.
Recheck the tool inputs.
For asynchronous tools, use the corresponding read tool instead of creating a duplicate job.
Connection & authentication
MCP server does not connect

Clients may show a disconnected server, a connection failure, or no available tools.

Verify that the endpoint is https://tos-mcp.app.fortyguard.com/mcp.
Confirm network access and that your client supports remote MCP over HTTP / Streamable HTTP.
Verify that the Authorization header is configured, then restart or reload the client after configuration changes.

Review MCP Client Setup and MCP Authentication.

Authentication fails

Authentication errors can appear as unauthorized or access-denied messages, or as a server that connects but cannot load tools.

Authorization: Bearer <FORTYGUARD_API_KEY>
Confirm the API key exists and the client inherited or read its environment variable.
Confirm the Bearer prefix is present and no extra quotes or spaces became part of the key.
Confirm the key has not been revoked or rotated, and restart the client after environment-variable changes.

Never paste a real API key into prompts, logs, or support screenshots. See MCP Authentication for secure key handling.

Connected, but no FortyGuard tools appear

Verify that the correct MCP server is enabled, that an old or local FortyGuard configuration is not conflicting, and that the endpoint and authentication settings are correct. Reconnect or restart the client after making changes.

The current documented catalog includes nine tools. Compare what your client shows with Available Tools.

Tool execution
Tool returns invalid input

MCP tool requests are schema-validated. A request can be rejected when required values are missing, unsupported, or incorrectly formatted.

Check latitude and longitude, GeoJSON polygons, date/time formats, analysis selections, and activity identifiers.
For routing, confirm that both origin and destination are valid.
Review the tool's Key inputs section and let the client retry with corrected arguments rather than inventing values.

Use the exact formats described in Available Tools.

Tool returns processing

This is expected for asynchronous tools. A processing status and activity identifier mean the analysis was accepted but is not complete yet.

Use the matching read tool
heatmap → heatmap_read
report → report_read
temperature_routing → temperature_routing_read

Retain the returned activity identifier and use the corresponding read tool. Do not repeatedly submit the same analysis while it is still processing.

Activity returns failed

A failed status means the requested analysis could not complete. Possible user-facing causes include unsupported location or coverage, unavailable data, an unsupported time window, invalid request context, or a temporary service failure.

Verify the request inputs and location/date support.
Retry only when appropriate; avoid repeatedly submitting identical paid work.
If the failure persists, contact FortyGuard support with the affected tool name and activity identifier, if one was returned.
Long-running analysis

Heatmaps, Heat Intelligence reports, and temperature-aware routes can take longer to complete. Submit once, retain the activity identifier, and check progress with the matching read tool. Completion times can vary, so do not create duplicates merely because a result is not immediate.

Data & results
Report download link expired

Completed reports may use a temporary signed download link. Use report_read again with the same report/activity identifier to retrieve the current result and obtain a fresh link.

Returned imagery date differs from the requested date

Imagery availability depends on source coverage and the imagery available for the requested location. Satellite or Street View analysis may use the most appropriate available imagery rather than imagery captured on the exact requested date.

Check the returned imagery metadata before relying on time-sensitive visual conclusions.

Segmentation labels look unexpected

Satellite and Street View segmentation results are model-generated estimates. Inspect segmentation percentages and imagery together, and treat the results as analytical evidence rather than guaranteed ground truth.

Large imagery response

Satellite and Street View tools may return imagery or segmentation artifacts in addition to structured metadata. Clients can display or store large responses differently. Focus on structured segmentation values and metadata, and use a client that supports large MCP responses.

Availability & access
Temperature-aware routing is unavailable

Routing may be unavailable when a location is outside routing coverage, a departure time is outside supported thermal-data availability, a route cannot be generated for the coordinates, or the analysis fails temporarily.

Confirm origin, destination, and departure time.
Try a supported location or time when appropriate.
For existing work, use temperature_routing_read rather than submitting duplicates.
Tool unavailable for your account

Available MCP capabilities and usage depend on the FortyGuard API plan associated with your API key. If you see access denied, capability unavailable, or insufficient usage/credits, confirm the intended account and plan before retrying. Contact FortyGuard if access appears incorrect.

Location or data is unavailable

Some capabilities depend on geographic coverage and data availability. This can affect environmental conditions, heatmaps, imagery, routing, and reports.

Verify coordinates and the requested date/time.
Confirm supported coverage and data availability.
Try a nearby supported area only when it is appropriate for the request.
Common response guidance
Category	Meaning	Recommended action
Authentication	Key or header cannot be accepted.	Verify the API key and Bearer header.
Invalid input	Required values or formats need correction.	Review the tool inputs and retry with valid arguments.
Processing	An asynchronous analysis is still running.	Use the corresponding read tool.
Failed	The requested analysis could not complete.	Review inputs and coverage; retry only if appropriate.
Access or plan	The account cannot use the requested capability.	Check account plan and access.
Data unavailable	Coverage or data is unavailable for the request.	Check the location and requested date/time.
Still having trouble?

If the issue persists, contact FortyGuard support and include the MCP client you are using, the affected tool name, and the activity identifier if one was returned.

Never include your API key, Authorization header, or other private credentials when sharing logs or screenshots.

On this page
Start here
Connection & authentication
Tool execution
Data & results
Availability & access
Common response guidance
Still having trouble?
PREVIOUS
Client Setup
NEXT
QGIS


---

# Manifest of included files

1. `docs/50-mcp-fresh-evaluation.md`
2. `docs/51-mcp-google-form-answers.md`
3. `evidence/mcp-fresh/2026-11-18-discovery.json`
4. `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`
5. `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`
6. `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.md`
7. `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.md`
8. `evidence/mcp-fresh/cursor-integration/2026-11-18-relaunch-status.md`
9. `evidence/mcp-fresh/cursor-integration/connection-status.md`
10. `evidence/mcp-fresh/cursor-integration/mcp-json-sanitized.json`
11. `evidence/mcp-fresh/complete-evaluation/mcp-documentation-discrepancies.md`
12. `evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.json`
13. `evidence/mcp-fresh/complete-evaluation/mcp-functional-test-results.md`
14. `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md`
15. `evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.json`
16. `evidence/mcp-fresh/complete-evaluation/mcp-test-matrix.md`
17. `evidence/mcp-fresh/complete-evaluation/mcp-tool-catalogue.json`
18. `evidence/mcp-fresh/documentation/index.json`
19. `evidence/mcp-fresh/documentation/mcp-authentication.md`
20. `evidence/mcp-fresh/documentation/mcp-client-setup.md`
21. `evidence/mcp-fresh/documentation/mcp-overview.md`
22. `evidence/mcp-fresh/documentation/mcp-quickstart.md`
23. `evidence/mcp-fresh/documentation/mcp-tools.md`
24. `evidence/mcp-fresh/documentation/mcp-troubleshooting.md`
