# Dashboard workflow audit

Status: not started. The login URL did not load on 17 November 2026, about 20:50 UTC, so no workflow was attempted. DASH-001.

Workflows to attempt only where the signed-in product exposes them:

| Workflow | Stop rule |
| --- | --- |
| Create a temperature analysis | One small area, one historical hour |
| Set a geographic boundary | Draw or enter one boundary; do not upload a large file |
| Choose environmental parameters | Stay inside the plan's parameter cap |
| Generate a heatmap | Skip if the same account's API credits would be consumed and the balance is not approved |
| Read the visualization | Capture legend, units, and time label |
| Open a report | Do not start a new premium report in the first pass |
| Routing | Attempt only if the control is available and its cost is visible before submit |

For each problem record the page, steps, expected result, actual result, severity, and a screenshot. An unfamiliar control is not a defect.
