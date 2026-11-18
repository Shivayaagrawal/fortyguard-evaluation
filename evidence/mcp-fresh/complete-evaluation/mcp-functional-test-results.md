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
