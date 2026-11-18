# Network notes

Paths only. Query strings were not saved.

| Path | Status | Duration | When |
| --- | --- | --- | --- |
| `/auth/verify-access` | 401 | 1,799 ms | First logged-out login load |
| `/auth/email-login` | 400 | 2,432 ms | Fake email and password |
| `/auth/verify-access` | 401 | 267 ms | Direct load of `/` that then showed login |

Login assets that returned HTTP 200 included the runtime, polyfills, main script, and stylesheet. Their individual durations were under 100 ms on the first load except the Google Maps script entry, which was still in progress when first read.

The password-reset request path was not recorded. The visible result was the success toast.
