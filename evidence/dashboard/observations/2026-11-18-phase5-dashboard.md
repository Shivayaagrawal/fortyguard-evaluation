# Dashboard, phase 5, 18 November 2026

The signed-in Safari tab was `https://dashboard.fortyguard.com/map`. No setting was changed and no feedback was submitted. Satellite View and Street View were not clicked. No heatmap or route was created.

## Feature Updates

The panel was already open on v1.1.1. The other version labels were v1.1.0, v1.0.7, and v1.0.4. Three groups were visible and collapsed:

- New & Enhanced Features, 4 updates
- UI/UX Improvements, 2 updates
- Bug Fixes & Stability, 4 updates

Clicks aimed at those rows and at v1.1.0 did not reveal the update text and did not change the selected version. That is an incomplete check. It is not recorded as a bug, because other clicks in the same pass also missed their targets. The support card was visible and unused. It offered General Support and Technical Help, with the text "Have questions about the new features or need help getting started? Our team is here to assist you."

The changelog text itself was not read.

## Map

The Alabama outline was still on the map. The open popup read `Coordinates: 32.608763, -86.680695` and offered Satellite View and Street View. It did not show a temperature. An earlier capture of a different point, `32.367693, -86.223497`, did show `60.59°F`. What a click inside the demo is supposed to display is still unknown, so the missing temperature is an observation, not a defect.

Further clicks aimed at Georgia and at Montgomery left the same coordinate popup in place. Those clicks are not evidence that the map ignores locations outside Alabama. The click targets in this pass were unreliable.

Visible and not used: the Go to search field, zoom in, zoom out, the location control, and the Map / Satellite basemap switch. The layers control was not opened.

## Settings and Feedbacks

The left rail showed a gear, a document icon, a chat icon, and a profile mark. Settings and Feedbacks were not opened. Nothing was edited and nothing was submitted.

## Later state of the same URL

After the map inspection, the same tab, still addressed to `https://dashboard.fortyguard.com/map`, showed a black page whose only text was:

`misdirected request to "dashboard.fortyguard.com"`

The tab was not reloaded again. This is a separate visible failure from the earlier `upstream request timeout`. Evidence: `evidence/dashboard/screenshots/dash-006-map-misdirected-request.png`.

A Google sign-in window was also open in Cursor. It was not used, and no capture of it was kept.
