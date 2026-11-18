# Fresh Temperature Dashboard evaluation

18 November 2026. This file replaces the logged-out-only write-up as the current dashboard result. The earlier logged-out checks stay in the first section. The signed-in checks are a new Safari session on `https://dashboard.fortyguard.com/map`.

No heatmap was created. No route was submitted. No Satellite View, Street View, feedback, or support action was clicked. No setting was changed. No credit was spent. The form was not submitted.

Rating: **NO DEFENSIBLE SCORE**.

## How this session was observed

Safari was already signed in. The window was captured with `screencapture` and clicks were sent with System Events. JavaScript injection was not available. Computer Use screenshots were not available. Timings for the signed-in map were not captured.

Screenshots: `evidence/dashboard-fresh/screenshots/`. Signed-in notes: `evidence/dashboard-fresh/observations/2026-11-18-safari-signed-in.md`. Logged-out timings stay in `evidence/dashboard-fresh/performance/2026-11-18-timings.md`.

## Logged-out checks, same day

These were done in the Cursor browser before the Safari session.

| Check | Result |
| --- | --- |
| `/login` | HTTP 200. Email and password fields, Log in, Google, Forgot password, Sign up. |
| Invalid login | HTTP 400 from `/auth/email-login`. Toast: "Invalid email or password. Please check your credentials and try again." The visible toast is clipped before "again." and then clears. The button reads "Signing in...". |
| Empty and `not-an-email` | Log in stays disabled. The page text does not show the native validation message. |
| Forgot password | Stays on `/login`. Reset for the example address: "If an account with this email exists, a password reset link has been sent." |
| Sign up | Stays on `/login`. "Use at least 8 characters." and "Map, Analyze, and Generate Reports — All For Free." The button stays disabled until the fields are filled. |
| Terms of Use and Privacy Policy | Both point at `https://www.fortyguard.com/privacypolicy`. A fetch of that URL returned HTTP 404. |
| Logged-out `/settings` | Stayed on a black `/` with an empty router outlet for more than 10 seconds. |
| Logged-out `/` | Redirected to `/login` after `/auth/verify-access` returned 401. |
| Logged-out `/map` | Returned to `/login`. |
| 1440×900, 1280×800, 390×844 | Login card stayed centered. No horizontal overflow. |

Document timing exists only for this logged-out pass. The first `/login` document was 1,883 ms.

## Signed-in Safari session

The map loaded with a sidebar and a Google map. Demo Heatmaps expanded to **Demo Heatmap – Alabama** and **Single Day**. The state outline was drawn. No temperature legend was on the map.

A click on the map opened a popup:

- Coordinates `32.608763, -86.680695`
- Buttons: Satellite View, Street View
- No temperature and no unit

Settings opened and was not changed:

- Measurement System: Custom
- Preferred Distance: Miles (mi)
- Preferred Temperature: Fahrenheit (°F)
- Map labels: Country, Province, and Locality all on

Feature Updates opened on v1.1.1, with v1.1.0, v1.0.7, and v1.0.4 also listed. New & Enhanced Features (4) expanded. The visible notes say the routing dashboard can compare Fastest, Hottest, and Balanced routes, and that heat and monitoring alerts can watch selected areas. UI/UX Improvements (2) and Bug Fixes & Stability (4) stayed collapsed. General Support and Technical Help were visible and not opened.

The `Go to...` search was visible with the placeholder "City, street, avenue..." and was not used. Create heatmap, Find the Coolest Route, Search Activity, Feedbacks, and Profile were visible and not opened. A later click aimed at Feedbacks missed the collapsed sidebar and moved the map to the western United States. That is not a controlled pan result, and it is not evidence that Feedbacks is broken.

The Map / Satellite basemap control was visible and was not switched. Zoom clicks were not confirmed by a closer view.

## What this session can support

The signed-in shell is usable. The sidebar names the main tasks. Settings states the preferred unit as Fahrenheit. Release notes open and the first group expands into readable sentences. The login page names a bad password and does not reveal whether an email has an account.

The temperature workflow was not shown. The demo click produced coordinates and two imagery buttons. No legend explained the colored outline. Create heatmap and Find the Coolest Route were not opened, so their forms, validation, and errors were not tested. Feedback, search, basemap, and zoom were not completed.

## Findings

| ID | Observation |
| --- | --- |
| DF-001 | Logged-out `/settings` stays on a blank `/` for more than 10 seconds. |
| DF-002 | The invalid-login toast is clipped and then disappears. The full sentence was captured from the page text. |
| DF-003 | Terms of Use and Privacy Policy share one URL, and that URL returned HTTP 404. |
| DF-004 | The Alabama demo click shows coordinates plus Satellite View and Street View, and no temperature, unit, or legend. |

DF-004 is observed behavior. It is not proof that a temperature cannot appear through another control.

## Rating

**NO DEFENSIBLE SCORE.**

A 1–10 score on the form would be read as a score of the temperature dashboard. This session used the shell, settings, one demo, one popup, and one release-note group. It did not show a temperature, and it did not run the two primary workflows. The number stays blank.
