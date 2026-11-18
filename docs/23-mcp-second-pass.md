# MCP second pass

18 November 2026, 12:50 UTC. One new handshake. The earlier 503 file was not changed.

Evidence: `evidence/phase11/mcp/2026-11-18T12-50-28-293Z-discovery-and-balance.json`.

## Connection

The client connected with Streamable HTTP and one bearer token. `tools/list` returned in about 10 seconds. Server: FortyGuard 4.0.11. This handshake did not return HTTP 503. That does not erase the earlier 200-then-503 record.

## Discovery

Eleven tools. None of the published nine are missing. `credit_balance` and `monitoring` are still absent from the published nine-tool page.

| Tool | Class from the current live schema | Live call |
| --- | --- | --- |
| `credit_balance` | Account read. No inputs. | Called. Premium balance 997,100. `cost_credits` 0. |
| `env_params` | Published page says direct. Schema requires latitude, longitude, Celsius temperature, and `date_time`. 2,900 Premium. | Not called. |
| `heatmap` | Async. Returns `activity_id`. 4,220 Premium. Accepts Polygon, Feature, or FeatureCollection. | Not called. |
| `heatmap_read` | Read. `activity_id` or `heatmap_id`. | Not called. |
| `monitoring` | Account. Fourteen operations. `list_monitors` and `list_alerts` are described as free. The others are 3,500 on Premium. | Not called. |
| `report` | Async. Live schema says Fahrenheit. 8,600 Premium. | Not called. |
| `report_read` | Read. Requires `analytics_id`. Description says `activity_id` is an alias and does not define that field. | Not called. |
| `satellite` | Published page says direct. 14,400 Premium. | Not called. |
| `streetview` | Published page says direct. Live schema says `horizontal_angle` is divided by 100. 8,600 Premium. | Not called. |
| `temperature_routing` | Async. Origin, destination, `departure_time`. 3,500. | Not called. |
| `temperature_routing_read` | Read. Requires `activity_id`. | Not called. |

The published tools page still says the report temperature is Celsius and that `heatmap_read` takes `heatmap_id`. The live schema does not match those two sentences. A successful handshake is not a test of the paid tools.
