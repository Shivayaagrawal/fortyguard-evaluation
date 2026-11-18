# Status page snapshot

Source: `https://status.fortyguard.com/`, fetched 17 November 2026 at 20:37 UTC. This is the page text, not a signed-in product session.

## Components at that time

| Component | 90-day figure shown | State shown |
| --- | ---: | --- |
| Heatmap | 98.46% | Down |
| Satellite Imagery | 98.46% | Down |
| Street View | 98.46% | Down |
| Heat Intelligence | 98.46% | Down |
| Environmental Parameters | 98.46% | Down |
| MCP Server | 88.10% | No data |
| Temperature Dashboard | 98.47% | Down |
| Heat Monitoring & Alerts | 99.50% | Down |
| Authentication & Accounts | 98.71% | Operational |

## Open incidents shown

Processing services and the dashboard: "Investigating", started `2026-11-17T20:24:22Z`. The page said requests may fail or time out.

MCP Server: "Investigating", started `2026-10-14T16:17:29Z`. That incident was still listed as open on 17 November.

## Recently resolved, same day

The history listed a matching set of incidents resolved at `2026-11-17T20:18:05Z` after 10 minutes, and an earlier dashboard incident resolved at `2026-11-17T19:58:47Z` after 5 minutes. The resolved copy said failed requests from those windows are safe to retry and only completed requests consume credits.

## What this does not prove

The page does not prove the MCP endpoint itself has been down since 14 October. It proves the status page still presents that incident and has no current MCP data. Phase 4 has to probe `https://tos-mcp.app.fortyguard.com/mcp` before that becomes a product defect.

A separate request to the API docs returned HTTP 504 from Envoy with `upstream request timeout`. That matches the processing outage. It is not, by itself, a documentation-content defect.
