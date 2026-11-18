# Cursor relaunch status

18 November 2026, checked again after 22:19 local time.

## Phase A

- Project `.env` exists.
- `FORTYGUARD_API_KEY` is set. Length 32. Value not printed.
- `~/.cursor/mcp.json` still has `railway` and `fortyguard`.
- Authorization remains `Bearer ${env:FORTYGUARD_API_KEY}`.
- The key is not in `mcp.json`.

## Phase B

This Cursor process still does not have `FORTYGUARD_API_KEY` in its environment. A Terminal relaunch with `source .env` and `export FORTYGUARD_API_KEY` has not been confirmed for the process that is running this Agent.

## Phase C

Cursor detects `user-fortyguard`. Live tool discovery is in error. The newest log session is `20261118T221906`:

- Streamable HTTP connect started.
- Server returned HTTP 401, `invalid_token`.
- OAuth fallback failed.
- Connection status: `conn=failed`.
- No tools exposed.
- `credit_balance` not called.

An earlier same-day SDK session with the key loaded from `.env` succeeded. That is not a Cursor result.

## Stopped

Phases D through G wait until Cursor is quit with `Cmd + Q` and relaunched from Terminal with the exported key.
