# /docs/monitoring-report

Captured: 2026-11-18T15:06:00.213Z
HTTP 200
Elapsed ms: 31857
H1: Alert Report

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
Alert Report
GET
/v1/monitors/{monitor_id}/alerts/{alert_id}/report

Read or download the report for one Alert: which tiles triggered it, the predicted time and temperature, and the weather details behind it. If the Monitor has PDF reports switched on, the report is downloadable as PDF (default) or Word. Use GET /v1/monitors/{monitor_id}/alerts/{alert_id}/report to read it, adding /download?type=pdf (or docx) to download the file.

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

ID of the Monitor that raised the Alert.

alert_id
string
REQUIRED

ID of the Alert to read.

Optional attributes
file_type
string
OPTIONAL

Download format for the /download address: pdf (default) or docx.

Request
Response
PYTHON
Copy
import requests

# Read the report
report = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts/alert_123/report",
    headers={"api-key": "your_api_key"}
)
print(report.json())

# Download it as a PDF file
pdf = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts/alert_123/report/download",
    headers={"api-key": "your_api_key"},
    params={"file_type": "pdf"}
)
open("alert-report.pdf", "wb").write(pdf.content)
PREVIOUS
List Alerts
NEXT
Check Status
