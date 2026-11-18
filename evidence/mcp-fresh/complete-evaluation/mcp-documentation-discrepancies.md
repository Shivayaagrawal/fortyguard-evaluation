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
