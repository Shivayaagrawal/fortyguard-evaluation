# MCP answers for the Google Form

18 November 2026. **NOT SUBMITTED.** Matches `docs/50-mcp-fresh-evaluation.md` and `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md`.

## Did you try the MCP? How did you set it up and which client did you use?

Yes. Primary client for this pass: **Cursor**.

FortyGuard was configured in `~/.cursor/mcp.json` as a remote Streamable HTTP MCP server at `https://tos-mcp.app.fortyguard.com/mcp`, authenticating with `Authorization: Bearer ${env:FORTYGUARD_API_KEY}` and no hardcoded key. An earlier `@modelcontextprotocol/sdk` 1.32.2 session had already listed 11 tools and called `credit_balance` once; this answer focuses on the Cursor integration.

The first Cursor launch failed with HTTP 401 `invalid_token` because the Cursor process did not inherit `FORTYGUARD_API_KEY` from the project `.env`. After quitting Cursor and relaunching from a shell that sourced `.env` and exported the key, the `user-fortyguard` namespace connected.

Through Cursor MCP I:

- Called `credit_balance` (Premium, 994,200 credits, cost 0).
- Discovered 12 namespace tools / 11 FortyGuard tools (published docs still list 9).
- Called free `monitoring.list_monitors` (empty list, cost 0).
- Probed `heatmap_read`, `report_read`, and `temperature_routing_read` error paths.

No paid analysis tools and no destructive monitoring operations were executed.

## How would you rate the MCP experience (1–10)?

**7**

Setup works in Cursor after the environment variable is exported in the launch shell, free tools execute reliably with clear traces, and invalid-ID errors are understandable. The score is held down by the easy-to-miss auth setup, documentation lag (9 published vs 11 live tools; report unit and Street View angle mismatches; missing `wait_for_completion`), and `list_alerts` being labeled free while returning `invalid_input`. Paid heat/route/imagery/report tools were not spent without approval, so this rating does not claim those paths were runtime-validated.

## Did you face any issues during setup or usage?

Yes.

1. Initial Cursor HTTP 401 `invalid_token` until relaunch with exported `FORTYGUARD_API_KEY`. Resolved; not persistent.
2. Published catalogue omits live `credit_balance` and `monitoring`.
3. `monitoring.list_alerts` described as free but failed with `invalid_input` (with and without `limit`).
4. Docs/schema mismatches: report °C vs live °F; Premium ≤2 analyses vs schema max 5; Street View heading/pitch vs docs viewing/pan; documented `wait_for_completion` absent live.
5. `report_read` schema omits `activity_id` and sets `additionalProperties: false`, but runtime accepts `activity_id` (alias claim is operationally true; schema contract is inaccurate).
6. Historical SDK handshake once returned HTTP 503 after initialize; not reproduced in the Cursor session.

## What improvements would you suggest for the MCP?

1. Publish the live 11-tool catalogue and mark which `monitoring` operations are free versus 3,500 credits, including destructive deletes.
2. Use one report temperature unit; reconcile Premium analysis limits with schema `maxItems`.
3. Add `activity_id` to the `report_read` schema; fix or document required inputs for `list_alerts`; align Street View angle semantics; remove or implement `wait_for_completion`; put live credit numbers on the tools page.
4. State clearly in Cursor setup docs that the API key must be exported in the same shell that launches Cursor.

## Overall MCP comments

FortyGuard MCP is usable from Cursor after correct environment setup. Free credit and monitor-list paths work, traces are informative, and invalid-ID errors are clear. The main gap is contract fidelity: agents cannot fully trust the published catalogue or several parameter descriptions without reading live schemas. Paid analysis tools remain intentionally unspent pending approval.
