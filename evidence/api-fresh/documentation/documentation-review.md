# Fresh REST documentation review

Captured 18 November 2026 from the rendered articles at `https://docs-api.fortyguard.com`. Page text is in `evidence/api-fresh/documentation/pages/`. This review does not reuse an earlier write-up as the evidence.

## Pages read

| Page | HTTP | Article extracted |
| --- | --- | --- |
| `/docs/introduction` | 200 | Yes |
| `/docs/quickstart` | 200 | Yes |
| `/docs/authentication` | 200 | Yes |
| `/docs/create-heatmap` | 200 | Yes |
| `/docs/satellite-view-segmentation` | 200 | Yes |
| `/docs/street-view-segmentation` | 200 | Yes |
| `/docs/heat-intelligence` | 200 | Yes |
| `/docs/environmental-parameters` | 200 | Yes |
| `/docs/routing` | 200 | Yes |
| `/docs/check-status` | 200 | Yes |
| `/docs/credits-usage` | 200 | Yes. The article is a key form, not a request contract. |
| `/docs/generate-free-key` | 200 | Yes. The article is an email form. It was not submitted. |
| `/docs/limitations` | 200 | Yes |
| `/docs/release-notes` | 200 | Yes |
| `/docs/monitoring-create` | 200 | Yes |
| `/docs/monitoring-list` | 200 | Yes |
| `/docs/monitoring-get` | 200 | Yes |
| `/docs/monitoring-update` | 200 | Yes |
| `/docs/monitoring-delete` | 200 | Yes |
| `/docs/monitoring-alerts` | 200 | Yes |
| `/docs/monitoring-report` | 200 | Yes |

The older slugs `/docs/streetview` and `/docs/satellite` were not used. The sidebar links to `/docs/street-view-segmentation` and `/docs/satellite-view-segmentation`, and both articles rendered.

## Quality checklist

| Question | Result |
| --- | --- |
| Required and optional fields identified? | Yes on the endpoint pages, with REQUIRED and OPTIONAL labels. |
| Types and ranges specified? | Types are labeled. Latitude and longitude ranges are on the limitations page and the routing page, not on the environmental-parameters page. |
| Date and time formats consistent? | No. Most analysis calls use a `date_time` object. Heat Intelligence uses a `date` string. Routing uses an ISO-8601 `departure_time`. |
| Temperature units clear? | No. Environmental parameters and heatmap tiles say Celsius. Heat Intelligence says Fahrenheit in the field and Celsius in the date sentence. The example value is 82.4. |
| GeoJSON examples consistent? | No. The limitations page requires a FeatureCollection. The quickstart uses one. The heatmap test request and the create-monitor example use a bare Polygon. |
| Success examples complete? | The visible text describes result fields. The Response tab content was not a separate example body in the extracted text. The quickstart shows how to read `data.activity_id` and `data.status`. |
| Error examples provided? | The quickstart has a status table and no JSON body. |
| Async workflow explained? | Yes for the analysis POSTs. Submit, receive `activity_id`, poll `GET /v1/status/{activity_id}`. |
| Credit costs and plans visible? | Yes on the analysis and monitor pages, and again in the limitations table. The credits-usage page does not show a cost. The introduction plan labels omit Startup, which the limitations table includes. |
| Can a developer integrate without guessing? | Not for Heat Intelligence's unit, the polygon shape, the status-word aliases, or the balance request. |

## Billing sentences

The quickstart says credits are deducted only after status `Completed`. The limitations page repeats that, and it says requests that violate the listed input constraints return 400 and are not charged. Failed tasks are not charged.

Those sentences were not verified with a POST in this pass.

## Named, without a path in the sidebar

The introduction says the API powers Heat Intelligence and Temperature Property Reports. The release notes say API Premium includes the Temperature Property API. No sidebar entry gives that report a path. This review did not find the endpoint. That is not proof the route is absent.

`GET /v1/alerts/{alert_id}` is named in the list-alerts prose and has no own page in the sidebar.

The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage`. The credits page does not show either path, a body, or a cost. The page DOM has an "Enter your API key" field and no form action. The key was not entered.
