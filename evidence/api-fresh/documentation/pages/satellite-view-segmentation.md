# /docs/satellite-view-segmentation

Captured: 2026-11-18T14:53:20.928Z
HTTP 200
Elapsed ms: 30851
H1: Satellite View Segmentation

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
Satellite View Segmentation
POST
/v1/satellite

Analyze a specific location using latitude and longitude coordinates.

Available in
API PREMIUM
Credit cost:
14,400 credits/request (Premium)
Required attributes
Optional attributes
Result Schema
Result Output Fields
Required attributes
sat
object
REQUIRED

Satellite data object containing location coordinates.

sat.latitude
number
REQUIRED

Latitude coordinate of the location.

sat.longitude
number
REQUIRED

Longitude coordinate of the location.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format, subject to server-supported date validation. Imagery capture date is not guaranteed to match this requested analysis date. No parent heatmap is required.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date
Optional attributes
granularity
number
OPTIONAL

Numeric metres: 20, 60, 80, or 100 (default). 20 selects an 80×80 pixel centered image crop, independent of temperature-catalog coverage.

date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Auto-populated based on filter_type.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2.

Result Schema

Once the satellite segmentation activity has finished processing, the final response contains three main outputs:

Location metadata (coordinates) - the latitude/longitude that was analyzed
Source imagery (original_image; legacy alias orignal_image) - the original satellite image returned as Base64
Segmentation outputs (segmentation) - class coverage %, legend colors, and the segmentation mask returned as Base64

For point satellite imagery, image_year/image_date are null when the provider does not expose capture dates; imagery_retrieved_at is retrieval time, not capture time. At 20 m the fixed centered image crop is 80×80 pixels; this is not a claim that provider imagery/weather resolution equals the thermal tile resolution.

This response is returned when the activity status is "Completed".

Result Output Fields
Coordinates
object

Location that was analyzed.

latitude (string) - Latitude value
longitude (string) - Longitude value
Orignal_image
array[string]

One or more Base64-encoded original satellite images (typically PNG/JPEG). Note: If you return raw Base64 (no prefix), users may need to prepend: data:image/png;base64, to render in a browser.

Image_year
number

Year of the satellite imagery used for the segmentation.

Segmentation
object

Model output + metadata for the satellite image.

image_dimensions (object) - Output image size in pixels
height (number): Pixel height
width (number): Pixel width
mode (string) - Processing mode (e.g., "sat" for satellite)
processing_time_seconds (number) - Time taken to run segmentation (seconds)
request_id (string) - Internal identifier for tracing/debugging
segments (object) - Class coverage values (typically percentages)
image_legend (object) - RGB legend for rendering the segmentation mask
image_content (string) - Base64-encoded segmentation mask image, decode to display/save the segmentation output. Note: If raw Base64, users may need data:image/png;base64, to render in a browser
Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/satellite',
    headers={'api-key': 'your_api_key'},
    json={
        'sat': {
            'latitude': 41.84632807720175,
            'longitude': -87.74329628220852
        },
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        },
        'granularity': 80
    }
)
PREVIOUS
Create Heatmap
NEXT
Street View Segmentation
