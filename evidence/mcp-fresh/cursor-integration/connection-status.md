# Cursor MCP integration attempt

18 November 2026, 22:02 local time.

## Configuration

`~/.cursor/mcp.json` matches the official Cursor example. Railway is still present. FortyGuard uses `Bearer ${env:FORTYGUARD_API_KEY}`. The key is not in the file.

`FORTYGUARD_API_KEY` is set in the project `.env`. It is not set in the shell that launched Cursor, and it is not in `.zshrc`, `.zprofile`, or `.zshenv`. Cursor does not load a project `.env` for a remote HTTP MCP server.

## Connection

Cursor detected `fortyguard` and opened Streamable HTTP.

- Result: `conn=failed`
- HTTP 401
- Body: `invalid_token`. The bearer token was not recognized.
- OAuth fallback failed.
- Tools were not listed.
- `credit_balance` was not called.

The same key connected through the SDK earlier, when the script loaded `.env` directly. This 401 is the Cursor process missing that variable.
