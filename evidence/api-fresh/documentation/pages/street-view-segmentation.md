# /docs/street-view-segmentation

Captured: 2026-11-18T14:53:51.793Z
HTTP 200
Elapsed ms: 30864
H1: Street View Segmentation

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
Street View Segmentation
POST
/v1/streetview

This endpoint performs segmentation analysis on street view imagery to identify and classify urban features, building facades, vegetation, road surfaces, and thermal characteristics from ground-level perspectives.

Available in
API PREMIUM
Credit cost:
8,600 credits/request (Premium)
Required attributes
Result Output Fields
Required attributes
latitude
number
REQUIRED

Latitude coordinate of the street view location.

longitude
number
REQUIRED

Longitude coordinate of the street view location.

vertical_angle
number
REQUIRED

Vertical viewing angle in degrees (tilt up/down).

horizontal_angle
number
REQUIRED

Horizontal viewing angle in degrees (pan left/right, 0-360).

back_view
boolean
REQUIRED

Whether to capture the back view (opposite direction).

Result Output Fields
Coordinates
object

Location that was analyzed.

latitude (string) - Latitude value
longitude (string) - Longitude value
Front
object

Street View "front" camera results for that location.

original_image (string) - Base64-encoded original street view image. Note: If raw Base64, users may need data:image/png;base64, to render in a browser
segments (object) - Class coverage values (typically percentages of the image)
image_legend (object) - RGB color legend for rendering the segmentation output
segmented_image (string) - Base64-encoded segmentation mask image, decode to display/save the segmentation output
image_date (string) - Date the Street View image was captured, in YYYY-MM-DD format
Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/streetview',
    headers={'api-key': 'your_api_key'},
    json={
        'latitude': 40.7128,
        'longitude': -74.0060,
        'vertical_angle': 10.0,
        'horizontal_angle': 90.0,
        'back_view': False
    }
)
PREVIOUS
Satellite View Segmentation
NEXT
Heat Intelligence
