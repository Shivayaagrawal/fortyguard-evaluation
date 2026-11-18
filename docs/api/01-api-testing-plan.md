# API testing plan

Phase 3. The dashboard is not being retried. No credit-consuming request is approved.

Account plan: not supplied. Remaining credits: not supplied. `FORTYGUARD_ALLOW_PAID` stays `false`. The local ceiling of 10,000 credits is a guard, not a balance.

## Workstreams

| ID | Work | Live calls | Status |
| --- | --- | --- | --- |
| A | Contract inventory against indexed docs and the local client | None | Done for the indexed contract. Article HTML was not rendered. |
| B | Local schema, guard, and redaction tests | None | Done. `npm test`, 18 passed. |
| C | Authentication on a non-processing read | `GET /v1/status/does-not-exist` | Done. 401 without a key, 401 with a dummy key, 404 with the account key. |
| D | Live validation of bad POST bodies | Not sent | Blocked. A rejected POST is not documented as impossible to accept, so it waits for approval. |
| E | Async lifecycle from the docs | None | Done as a documented sequence. Not observed on a real job. |
| F | One environmental-parameters job | Not sent | Blocked. Needs the plan, the remaining balance, and an explicit spend approval. Documented cost 2,110 or 2,900. |
| G | Developer-experience review of the contract | None | Done from the docs and the three live reads. |

## Stop rules

- Do not POST `/v1/heatmap`, `/v1/env_params`, `/v1/routing`, `/v1/heat_intelligence`, `/v1/streetview`, or `/v1/satellite` in this phase.
- Do not call MCP tools.
- Do not print the API key.
- If a read returns `activity_id` as a created job, stop. The 404 message names the field. That is not a created job.
