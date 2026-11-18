# /docs/mcp-authentication

Captured: 2026-11-18T16:24:37.247Z
HTTP 200
Elapsed ms: 31557
H1: MCP Authentication

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
MCP Authentication

Authenticate MCP requests using your FortyGuard API key.

Authentication header

FortyGuard MCP uses Bearer authentication. Your MCP client must include your FortyGuard API key in the Authorization header when connecting to the MCP endpoint.

Authorization: Bearer <FORTYGUARD_API_KEY>
Copy
MCP vs REST API authentication

The FortyGuard REST API documentation may show API-key authentication using an api-key header. MCP connections use the Bearer authorization format shown above.

Interface	Header format
REST API	api-key: YOUR_API_KEY
FortyGuard MCP	Authorization: Bearer <FORTYGUARD_API_KEY>
Secure key handling
Store keys in environment variables or your client's secure secret or configuration mechanism.
Do not commit API keys to source control.
Do not put API keys in prompts or send them as tool arguments.
Avoid sharing screenshots or logs containing secrets.
Rotate a key if it is exposed.
Example environment variable
export FORTYGUARD_API_KEY='your_api_key_here'
Copy
Authorization: Bearer $FORTYGUARD_API_KEY
Copy

Shell and client interpolation syntax differs between clients.

Access and usage

Available MCP capabilities and usage are governed by the FortyGuard account and API subscription associated with the API key.

Authentication errors

Authentication can fail when an API key is missing, invalid, expired, revoked, or does not have access to the requested capability. Verify that your client is sending the Authorization header using the Bearer format and that the API key is active.

On this page
Authentication header
MCP vs REST API authentication
Secure key handling
Example environment variable
Access and usage
Authentication errors
PREVIOUS
MCP Quickstart
NEXT
Available Tools
