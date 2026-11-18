# /docs/monitoring-update

Captured: 2026-11-18T15:04:24.627Z
HTTP 200
Elapsed ms: 31844
H1: Update Monitor

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
Update Monitor
PATCH
/v1/monitors/{monitor_id}

Change a Monitor: rename it, replace its rules or notification addresses, pause it (enabled false) or resume it (enabled true), or switch PDF reports on/off. The heatmap and the watched area cannot be changed — create a new Monitor instead. Use PATCH /v1/monitors/{monitor_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor to change.

Optional attributes
name
string
OPTIONAL

New Monitor name (1–120 characters).

rules
array
OPTIONAL

Replacement rule list (1–20 rules; replaces the whole list).

notifications
object
OPTIONAL

Replacement notification addresses (replaces the whole list).

enabled
boolean
OPTIONAL

False pauses checks; true resumes them (a resumed Monitor runs immediately).

generate_report
boolean
OPTIONAL

Switch PDF reports for new Alerts on/off.

Request
Response
PYTHON
Copy
import requests

response = requests.patch(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123",
    headers={"api-key": "your_api_key"},
    json={"enabled": False, "name": "Downtown heat watch (paused)"}
)

print(response.json())
PREVIOUS
Get Monitor
NEXT
Delete Monitor
