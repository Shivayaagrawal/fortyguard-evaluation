# /docs/mcp-quickstart

Captured: 2026-11-18T16:24:05.689Z
HTTP 200
Elapsed ms: 31569
H1: MCP Quickstart

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
MCP Quickstart

Connect an MCP-compatible AI client to FortyGuard and make your first request.

Get a FortyGuard API key

FortyGuard MCP uses your FortyGuard API key for authentication. If you already use the FortyGuard API, use the API key associated with the account and subscription you want to access.

See API Authentication for information about obtaining and managing an API key. MCP uses a different HTTP header format, described below.

Store the key securely
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
Do not commit your API key to source control or include it directly in prompts.
Connection details
Transport	Remote MCP over HTTP / Streamable HTTP
Endpoint	https://tos-mcp.app.fortyguard.com/mcp
Authentication	Authorization: Bearer <FORTYGUARD_API_KEY>
Configure your MCP client

Add FortyGuard as a remote MCP server in your MCP-compatible client. Configure the FortyGuard MCP endpoint and send your API key using the Authorization Bearer header.

Conceptual MCP configuration
{
  "url": "https://tos-mcp.app.fortyguard.com/mcp",
  "headers": {
    "Authorization": "Bearer <FORTYGUARD_API_KEY>"
  }
}
Copy

Configuration syntax differs between MCP clients.

Verify the connection

After connecting, your client should discover the FortyGuard MCP tool catalog. The current catalog contains nine tools:

env_params
heatmap
heatmap_read
report
report_read
satellite
streetview
temperature_routing
temperature_routing_read
Make your first request
Get the environmental conditions for Phoenix, Arizona at latitude 33.4484 and longitude -112.074 for September 20, 2025, using a reference temperature of 35 °C.

The MCP client should select the environmental-parameters capability and return structured FortyGuard data.

Next steps

Review MCP Authentication for key-handling guidance, Client Setup to configure a compatible client, or Available Tools to choose a FortyGuard capability.

On this page
Get a FortyGuard API key
Store the key securely
Connection details
Configure your MCP client
Verify the connection
Make your first request
Next steps
PREVIOUS
MCP Overview
NEXT
MCP Authentication
