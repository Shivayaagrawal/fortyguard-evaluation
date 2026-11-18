# REST API answers for the Google Form

18 November 2026. **NOT SUBMITTED.** These three answers match `docs/48-rest-api-fresh-evaluation.md`. One environmental-parameters request was sent.

## API rating (1–10)

6.

I sent the documented New York environmental-parameters example. It was accepted in 1.5 seconds and the status read was already Completed, with the requested coordinate, a New York timestamp, Celsius field names, and nulls where methane and CO₂ were missing. I am keeping the score at 6 because the docs still disagree on the Heat Intelligence unit, polygon shape, and when credits are charged, and the completed response does not show the cost. I did not test validation or the other analysis routes.

## What issues did you notice with API design? Are any endpoints or functionality missing?

The environmental-parameters path works. `POST /v1/env_params` returned an activity id, and `GET /v1/status/{activity_id}` returned the measurements. The request uses `latitude` and `longitude`. The result uses `lat` and `lon`.

The same docs are not consistent elsewhere. Heat Intelligence says the temperature is Fahrenheit, then says the date applies to a Celsius temperature, and the example is 82.4. The limitations page requires a GeoJSON FeatureCollection, while the heatmap and create-monitor examples send a bare Polygon. The quickstart says credits are charged only when a task completes, but every monitor call, including list and delete, is priced at 3,500 credits. I did not call those routes. The status body for my completed job has no credit field, and the credits page never shows a balance request. The release notes name two usage POSTs without a body or a price.

Street View marks `back_view` as required, and the release notes call the back view optional. The alert-report page says `type` in the prose and `file_type` in the example. The introduction and release notes name a Temperature Property API, and I did not find its path. I am not saying the route is absent.

## How would you improve the API documentation?

I would make the Heat Intelligence unit the same in the field, the date sentence, and the example. I would replace the bare Polygon examples with the FeatureCollection required by the limitations page. I would show the live 401 and 404 JSON next to the status table, and I would publish the balance request with its method, path, body, and cost. I would also put the charged credits on the completed status body, or say clearly that the body is not the receipt.
