# /docs/mcp-client-setup

Captured: 2026-11-18T16:25:40.355Z
HTTP 200
Elapsed ms: 31554
H1: MCP Client Setup

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
MCP Client Setup

Connect FortyGuard MCP to a compatible AI client using your FortyGuard API key.

FortyGuard MCP can be used from clients that support remote Model Context Protocol servers. The configurations below have been validated with OpenAI Codex CLI, Cursor, and Claude Code.

Connection Details
Endpoint
https://tos-mcp.app.fortyguard.com/mcp
Authentication
Authorization: Bearer <FORTYGUARD_API_KEY>
Transport
Remote MCP over HTTP / Streamable HTTP
Requirements
A valid FortyGuard API key.
An MCP-compatible client.
Network access to the FortyGuard MCP endpoint.
Keep your API key private. Prefer environment variables or your client's secure configuration mechanism. Never commit API keys to source control.
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
OpenAI Codex CLI
CLI

Codex can connect to FortyGuard as a remote MCP server.

1. Set environment variables
export FORTYGUARD_API_KEY='your_api_key_here'
export FORTYGUARD_AUTH_HEADER="Bearer $FORTYGUARD_API_KEY"
Copy
2. Configure Codex MCP

Edit ~/.codex/config.toml and add:

[mcp_servers.fortyguard]
url = "https://tos-mcp.app.fortyguard.com/mcp"
enabled = true
env_http_headers = { Authorization = "FORTYGUARD_AUTH_HEADER" }
startup_timeout_sec = 30
tool_timeout_sec = 120
Copy
3. Verify
codex mcp list
Copy

Inside Codex, use /mcp and confirm that fortyguard is connected and its tools are available.

Cursor
AI IDE

Cursor can connect to FortyGuard using a remote MCP configuration.

1. Set environment variable
export FORTYGUARD_API_KEY='your_api_key_here'
Copy

Ensure Cursor can access the environment variable. When testing locally, launching Cursor from the same shell is one way to ensure it inherits the environment.

2. Configure Cursor

Edit ~/.cursor/mcp.json. If it already contains other MCP servers, add the fortyguard entry instead of replacing the existing configuration.

{
  "mcpServers": {
    "fortyguard": {
      "url": "https://tos-mcp.app.fortyguard.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:FORTYGUARD_API_KEY}"
      }
    }
  }
}
Copy
3. Verify

Open Cursor's MCP settings and confirm that fortyguard is connected and its tools are available to the Agent.

Claude Code
CLI

Claude Code supports remote HTTP MCP servers.

1. Set API key
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
2. Add MCP server
claude mcp add --transport http fortyguard \
  https://tos-mcp.app.fortyguard.com/mcp \
  --header "Authorization: Bearer $FORTYGUARD_API_KEY"
Copy
3. Verify
claude mcp list
claude mcp get fortyguard
claude
Copy

Inside Claude Code, use /mcp to verify that FortyGuard is connected. Claude Code may display MCP tools using a server-prefixed tool name.

Test your connection
Get environmental conditions for latitude 33.4484, longitude -112.074, for September 20, 2025 using a reference temperature of 35 °C.

Your client should discover FortyGuard tools, choose env_params, and return structured environmental data.

Having trouble connecting? See MCP Troubleshooting.

On this page
Connection Details
Requirements
OpenAI Codex CLI
Cursor
Claude Code
Test your connection
PREVIOUS
Available Tools
NEXT
Troubleshooting
