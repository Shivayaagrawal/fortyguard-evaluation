# /docs/monitoring-delete

Captured: 2026-11-18T15:04:56.489Z
HTTP 200
Elapsed ms: 31861
H1: Delete Monitor

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
Delete Monitor
DELETE
/v1/monitors/{monitor_id}

Permanently delete a Monitor together with its runs and Alert history. This cannot be undone. Use DELETE /v1/monitors/{monitor_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor to delete.

Request
Response
PYTHON
Copy
import requests

response = requests.delete(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123",
    headers={"api-key": "your_api_key"}
)

print(response.json())
PREVIOUS
Update Monitor
NEXT
List Alerts
