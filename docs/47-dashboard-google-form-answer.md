# Dashboard answers for the Google Form

18 November 2026. **NOT SUBMITTED.** Paste these six answers only. Leave the rating blank.

Source: the signed-in Safari session on `https://dashboard.fortyguard.com/map`, plus the logged-out login checks from the same day. Detail: `docs/46-dashboard-fresh-product-evaluation.md`.

## First impression

The signed-in map opens with a clear sidebar: heatmaps, a demo, settings, and feature updates. The Alabama demo draws a state outline. The first click does not show a temperature. It shows coordinates `32.608763, -86.680695` and buttons for Satellite View and Street View.

## Liked most

Settings and Feature Updates both open and are readable. Settings states the preferred temperature as Fahrenheit (°F) and distance as miles. The v1.1.1 notes expand into plain sentences about comparing Fastest, Hottest, and Balanced routes, and about heat monitoring. The logged-out login page also names a bad password and uses a generic reset message that does not reveal whether an account exists.

## Disliked most

The demo is a heatmap, and the click result has no temperature, no unit, and no legend. The only actions in that popup are imagery buttons. Create heatmap and Find the Coolest Route were visible and were not run.

## Bugs or confusing behaviour

- Logged-out `/settings` stayed on a blank page for more than 10 seconds, then a direct load of `/` returned to login.
- The invalid-login toast is clipped before the last word and then clears. The full sentence is "Invalid email or password. Please check your credentials and try again."
- Terms of Use and Privacy Policy both link to `https://www.fortyguard.com/privacypolicy`, which returned HTTP 404.
- The Alabama popup shows coordinates and imagery actions, not a temperature.

Feedbacks, zoom, the basemap switch, search, and the two creation workflows were not completed. They are not listed as bugs.

## Three recommendations

1. Show the temperature and the unit in the location popup. The demo click currently shows coordinates and imagery buttons only.
2. Add a legend for the colored demo region so the fill can be read without guessing.
3. Point Terms of Use and Privacy Policy at pages that load. Both currently share one URL that returns 404.

## Dashboard usability, 1–10

**NO DEFENSIBLE SCORE.**

The shell, settings, and one release-note group were used. A temperature was not shown, and the two main workflows were not run. A number would overstate that session. Leave the field blank unless the hiring contact says otherwise.
