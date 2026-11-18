# REST API server architecture review

18 November 2026. The FortyGuard API server source is not in this repository. This review does not invent routes, middleware, billing, or a database.

## Search

The workspace `/Users/shivanyaagrawal/fourty` contains one project, `fortyguard-evaluation`. Its `src/` tree is:

- `src/api/authentication.ts`
- `src/api/client.ts`
- `src/api/endpoints.ts`
- `src/api/schemas.ts`
- `src/mcp/client.ts`
- `src/mcp/discovery.ts`
- `src/mcp/http-classification.ts`
- `src/mcp/tool-tests.ts`
- `src/utils/`

There is no application server, no route table, no handler, no service layer, and no database client for FortyGuard. Express and Hono appear only inside `node_modules` as dependencies of the MCP SDK. They are not FortyGuard's API.

## Finding

| ID | Component | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-001 | REST API server | Workspace listing and `src/api/`. | Server source, if a white-box review is required. | No server source. | Routing, validation, job storage, retries, and credit deduction cannot be inspected. | Not a product defect. It blocks the white-box review. | Confirmed |

The trace `Route → Middleware → Handler → Validation → Service → Database → Response` cannot be walked. Nothing below is a claim about FortyGuard's production process.

## What the local client is

`src/api/client.ts` is an evaluation client. `assertPaidCallAllowed` refuses a documented cost above zero unless `FORTYGUARD_ALLOW_PAID` is exactly `true`, and it refuses a cost above `FORTYGUARD_CREDIT_BUDGET`. That guard is local. It does not prove the server checks a balance.

`src/api/authentication.ts` sends the documented `api-key` header. It does not validate keys.

`src/api/endpoints.ts` and `src/api/schemas.ts` are fixtures copied from documentation. They accept both published heatmap shapes and the heat-intelligence example `82.4` without choosing a unit. A fixture accepting an example is not server validation.

## Questions that stay unanswered without server source

- How an API key is looked up, and whether every route uses the same check.
- Whether unknown JSON fields are rejected.
- How an activity id is generated and stored.
- Whether a retry creates a second job.
- Where credits are calculated, whether the deduction is atomic, and whether a failure is charged.
- Whether a 500 hides or leaks an internal error.
- How external weather, imagery, and routing failures are mapped to `Failed`.

Black-box results that do exist are in `docs/41-api-documentation-vs-implementation.md`. They cover the status route and one environmental job only.

## Local harness quality

This is the evaluation project, not the API.

| Check | Result |
| --- | --- |
| Unit tests | 24 passed. They use fixtures and do not call the API. |
| Typecheck | Passed. |
| Integration tests | The script exits 1. No files exist. |
| Secret handling | The client reads the key from the environment. Evidence writers redact it. |
| Paid-call guard | Present in `src/api/client.ts` lines 14–32. It was left at `FORTYGUARD_ALLOW_PAID=false`. |

No production configuration was changed.
