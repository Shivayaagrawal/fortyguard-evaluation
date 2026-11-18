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
