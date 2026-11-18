# FortyGuard product evaluation

Evidence-backed review of the Temperature Dashboard, Temperature API, and Temperature MCP. The hiring form is not submitted from this repository.

The working record is `docs/PRODUCT_EVALUATION_TRACKER.md`. Update it at the end of every testing session. Form drafts live in `docs/FINAL_GOOGLE_FORM_RESPONSES.md`. The numbered files in `docs/` hold the longer technical notes and should not be copied back into the tracker.

## Current phase

Planning is complete. No dashboard session was opened, and no FortyGuard API or MCP method was called.

Live checks on 17 November 2026, about 20:36 UTC:

- `https://docs-api.fortyguard.com/docs/introduction` returned HTTP 504, `upstream request timeout`.
- `https://status.fortyguard.com/` reported an active outage, started `2026-11-17T20:24:22Z`, covering the dashboard and the processing APIs. Authentication was still marked operational.
- The same status page still shows an MCP Server incident opened on `2026-10-14`, with the component marked `No data`.

API behavior in the docs is taken from indexed documentation excerpts, not from a full render of the docs site. Treat every request schema as provisional until those pages load and a runtime response is recorded.

## What is safe to run now

```bash
npm test
npm run typecheck
```

These commands check local fixtures, the credit guard, and secret redaction. They do not use the network.

`FORTYGUARD_ALLOW_PAID` defaults to `false`. `src/api/client.ts` throws before `fetch` when a documented credit cost is greater than zero.

## Credentials

Put the API key in `.env`. Do not paste it into chat, commits, screenshots, or evidence files.

```bash
cp .env.example .env
```

Required before the next phase:

| Item | Why |
| --- | --- |
| `FORTYGUARD_API_KEY` | REST header `api-key` and MCP `Authorization: Bearer` |
| Plan name | Basic, Startup, and Premium do not expose the same endpoints or prices |
| Remaining credits | The cheapest documented successful call is 2,110 credits |
| Dashboard sign-in | Done in the browser by the account owner. The password is not stored here |

## Execution order

1. Planning. This checkout. Done.
2. Dashboard. After the status page clears and someone can sign in. Record navigation and workflows in `dashboard/` and `docs/06-dashboard-evaluation.md`.
3. API. Unbilled validation first. One paid call only with an explicit credit ceiling.
4. MCP. `tools/list` first. Compare that catalog with `src/mcp/discovery.ts`. Do not repeat an expensive tool already run through REST unless the remaining balance is approved.
5. Cross-product comparison. Promote a finding from suspected to confirmed only when a response or screen shows it.
6. Form draft. Ratings stay blank until the runs above exist. Do not submit the form without approval.

## Credit plan

Documented costs, per request, from the limitations page:

| Operation | Basic / Startup | Premium | First-pass rule |
| --- | ---: | ---: | --- |
| Environmental parameters | 2,110 | 2,900 | Only paid success candidate |
| Heatmap | 3,500 | 4,220 | Not in the first paid pass |
| Routing | not included | 3,500 | Skip unless the key is Premium and a route is still required |
| Street View | not included | 8,600 | Skip |
| Heat Intelligence | not included | 8,600 | Skip |
| Satellite | not included | 14,400 | Skip |

Unbilled checks, in order, and only while responses show that no activity was accepted:

1. Missing API key, then a key that cannot be valid.
2. `POST /v1/env_params` with a required field removed.
3. `POST /v1/heatmap` with a polygon ring that is not closed.
4. `GET /v1/status/does-not-exist`.

Stop the paid sequence if any of those return an `activity_id`. Credits are documented as deducted only when status becomes `Completed`. A timeout after acceptance is not the same as a rejected request, so a timed-out submit is not retried automatically.

The local budget in `.env` is 10,000 credits. That is enough for one environmental-parameters call and its status polls, with room for a validation mistake. It is not enough for satellite imagery, and it is intentionally below two heatmaps.

## Layout

`src/api` holds the documented REST inventory and a client that records redacted exchanges. `src/mcp` holds the nine documented tools and a Streamable HTTP connector that Phase 4 will use. `docs/09-final-evaluation.md` maps each finding to a form question.
