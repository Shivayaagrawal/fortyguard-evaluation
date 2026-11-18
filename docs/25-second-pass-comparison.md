# Second-pass comparison

| Check | Previous result | Current result | What changed |
| --- | --- | --- | --- |
| Docs host | HTTP 504 on 17 Nov, then later pages rendered | Nine articles rendered on 18 Nov 12:50 UTC | The host is available for those pages. |
| Status route during the outage | No HTTP response | 401, 401, 404, and 200 | The outage behavior is not current. |
| Missing key | 401, names `api-key` | Same message | Unchanged. |
| Invalid key | 401, invalid or unknown | Same message | Unchanged. |
| Unknown activity | 404, names `activity_id` | Same message | Unchanged. |
| Completed env-params job | Completed, no credit field, 2,900 balance drop | Reread Completed, same body shape, balance still 997,100 | The stored job is still readable. No new charge. |
| MCP 503 | HTTP 200 then HTTP 503 | This handshake listed tools. The 503 file remains. | A later success does not delete the earlier failure. |
| Tool count | 11, including `credit_balance` and `monitoring` | 11, same two extras | Unchanged. |
| Report unit | Live Fahrenheit, published Celsius, REST mixed | Same on the pages read today and the new schema | Not resolved. |
| Polygon examples | FeatureCollection and Polygon | Both still published | Not resolved. |
| Paid POST routes | Not executed | Not executed | Still awaiting approval. |
| Paid MCP tools | Not executed | Not executed | Still awaiting approval. |
| Dashboard | Closed as blocked | Not retested | Unchanged. |

## New in this pass

- The known activity is still readable after the earlier outages.
- The Premium balance is unchanged at 997,100, so this pass spent nothing.
- The heatmap documentation now states `filter_type` 4 and a 20 m granularity. The environmental page still stops at `filter_type` 3.
- The street-view and satellite REST articles were not extracted. Their MCP descriptions were.

## Resolved

None of the contract conflicts checked today were removed. The status-route timeout is not the current response.

## Still blocked

Five REST processing routes and the paid MCP tools. A new environmental-parameters job would also be a paid call and was not sent.

No rating was assigned.
