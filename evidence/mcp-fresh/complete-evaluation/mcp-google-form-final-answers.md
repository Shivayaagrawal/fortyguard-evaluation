# MCP Google Form final answers (draft — NOT SUBMITTED)

Prepared 18 November 2026 from Cursor MCP evaluation (Phases B–D + free functional tests). Credentials redacted. Form not submitted.

## Did you try the MCP? How did you set it up and which client did you use?

Yes. Primary client for this evaluation pass: **Cursor**.

FortyGuard was configured in `~/.cursor/mcp.json` as a remote Streamable HTTP MCP server at `https://tos-mcp.app.fortyguard.com/mcp`, with `Authorization: Bearer ${env:FORTYGUARD_API_KEY}` and no hardcoded key. An earlier SDK session (`@modelcontextprotocol/sdk` 1.32.2) had already confirmed discovery and a free `credit_balance` call; this form answer focuses on the Cursor integration.

Initial Cursor launch failed authentication with HTTP 401 `invalid_token` because the Cursor process did not inherit `FORTYGUARD_API_KEY` from the project `.env`. After quitting Cursor and relaunching from a shell that sourced `.env` and exported the key, the `user-fortyguard` namespace connected successfully.

Through Cursor MCP I then:

- Executed `credit_balance` (Premium, 994,200 credits, cost 0).
- Discovered 12 namespace tools / 11 FortyGuard tools.
- Executed free `monitoring.list_monitors` (empty list, cost 0).
- Probed read/error paths on `heatmap_read`, `report_read`, and `temperature_routing_read`.

No paid analysis tools and no destructive monitoring operations were executed.

## How would you rate the MCP experience (1–10)?

**7 / 10**

Justification:

- Setup eventually works cleanly in Cursor, but the env-var inheritance requirement is easy to miss and produced a real 401 on first attempt.
- Once connected, tool discovery is strong and free tools (`credit_balance`, `list_monitors`) execute reliably with useful traces and zero cost.
- Error messages for unknown activity IDs are clear and actionable.
- Documentation quality holds the score down: published 9-tool catalogue vs live 11, Celsius/Fahrenheit conflict on reports, missing `wait_for_completion` in schemas, Street View angle semantics mismatch, and a monitoring tool that mixes free reads with destructive deletes.
- `list_alerts` is labeled free but failed with `invalid_input` in two attempts.
- Paid analysis capabilities remain untested by design (approval gate), so the rating reflects verified free/read paths plus contract quality, not end-to-end heat/route/imagery success.

## Did you face any issues during setup or usage?

Yes.

1. Cursor first returned HTTP 401 `invalid_token` until relaunched with `FORTYGUARD_API_KEY` in the process environment. Resolved; not persistent.
2. Published MCP catalogue omits live tools `credit_balance` and `monitoring`.
3. `monitoring.list_alerts` claimed free but returned `invalid_input`.
4. Docs/schema mismatches: report temperature unit; report analysis limits; Street View angle meaning; documented `wait_for_completion` absent live; `report_read` schema omits `activity_id` even though runtime accepts it.
5. Historical SDK handshake once returned HTTP 503 after initialize (earlier evidence); not reproduced in the Cursor session.

## What improvements would you suggest for the MCP?

Priority order:

1. Publish the live 11-tool catalogue and document which `monitoring` operations are free vs 3,500 credits, including that the same tool exposes deletes.
2. Align report temperature to one unit across docs, description, and schema; reconcile Premium “at most 2 analyses” with schema `maxItems: 5`.
3. Put `activity_id` on the `report_read` schema (runtime already accepts it) or remove the alias language; likewise align Street View heading/pitch docs with the live fields.
4. Fix or document required inputs for `list_alerts`; currently fails with only `operation` set.
5. Either implement `wait_for_completion` or remove it from the tools page; print the live credit numbers on the docs page.
6. Strengthen Cursor setup docs: export `FORTYGUARD_API_KEY` in the same shell that launches Cursor (project `.env` alone is insufficient for remote HTTP MCP).

## Overall MCP comments

FortyGuard MCP is usable from Cursor after correct environment setup. Free credit and monitor-list paths work, traces are informative, and invalid-ID errors are understandable. The main product gap is contract fidelity: agents cannot trust the published catalogue or several parameter descriptions without reading live schemas. With documentation aligned and `list_alerts` fixed, this would be a stronger agent integration. Paid analysis tools were intentionally not spent without approval, so this assessment does not claim those paths were runtime-validated.

## Supporting local evidence

- `evidence/mcp-fresh/complete-evaluation/`
- `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`
- `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`
