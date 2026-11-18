# /docs/monitoring-list

Captured: 2026-11-18T15:03:20.917Z
HTTP 200
Elapsed ms: 31922
H1: List Monitors

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
List Monitors
GET
/v1/monitors

See all your Monitors. Use GET /v1/monitors, optionally filtered by heatmap or by whether the Monitor is switched on.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Optional attributes
Optional attributes
heatmap_id
string
OPTIONAL

Show only Monitors for this heatmap.

enabled
boolean
OPTIONAL

Show only switched-on (true) or paused (false) Monitors.

limit
number
OPTIONAL

How many Monitors to return (1–100, default 25).

cursor
string
OPTIONAL

Page marker from a previous answer to fetch the next page.

Request
Response
PYTHON
Copy
import requests

response = requests.get(
    "https://api.fortyguard.com/v1/monitors",
    headers={"api-key": "your_api_key"},
    params={"heatmap_id": "heatmap_abc123", "limit": 25}
)

print(response.json())
PREVIOUS
Create Monitor
NEXT
Get Monitor
