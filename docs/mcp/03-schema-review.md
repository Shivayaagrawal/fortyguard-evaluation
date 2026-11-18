# MCP schema review

No live input schema was returned.

The documented shapes, still unverified against `tools/list`, are the ones already recorded in `src/mcp/discovery.ts` and `docs/05-mcp-evaluation.md`:

| Question | Documented claim | Live schema |
| --- | --- | --- |
| `heatmap_read` id field | `heatmap_id` | Not retrieved |
| `report_read` id field | `analytics_id`, and the page says `activity_id` is also accepted | Not retrieved |
| `temperature_routing_read` id field | Not fully visible in the earlier excerpt | Not retrieved |
| Heatmap geometry | GeoJSON-style polygon | Not retrieved |
| Report temperature unit | Celsius | Not retrieved |
| Whether a `_read` tool spends credits | Documented as not creating a new analysis | Not confirmed, so none was called |

Read tools were not invoked. There is no existing activity id from this evaluation, and a made-up id was not sent. Processing tools were not called.

Local catalog tests still pass. They check the nine documented names in the repository. They are not a live discovery result.
