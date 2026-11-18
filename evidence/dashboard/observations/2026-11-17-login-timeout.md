# Dashboard phase — blocked at the login URL

Observed 2026-11-17, about 20:50 UTC. One request. No retry.

`https://dashboard.fortyguard.com/login` rendered a blank page whose only text was `upstream request timeout`. The document had no title and no interactive controls. Sign-in was not possible.

The public status page, last checked `2026-11-17T20:50:25Z`, listed Temperature Dashboard as Down. The open incident started `2026-11-17T20:47:15Z`. Authentication and Accounts were marked operational. The status page is context. The defect classification rests on the login URL itself.

Screenshot: `evidence/dashboard/screenshots/dash-001-login-upstream-timeout.png`.

This is an availability failure of the product entry point. It is not evidence about navigation, workflows, temperature units, or visual design. Those were not seen.
