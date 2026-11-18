# Fresh dashboard session

18 November 2026. Cursor browser. No dashboard password was available in the environment. Safari was running, and screen recording for Computer Use was off, so that session was not inspected. Google sign-in was not completed.

## Login

`https://dashboard.fortyguard.com/login` rendered the Temperature Dashboard form. Document timing on the first load: duration 1,883 ms, DOM content loaded 1,336 ms, HTTP 200. Visible text: welcome line, email, password, forgot password, log in, Google, and sign up. The initial automation viewport was 926 by 774.

`POST https://dashboard-api.apps.fortyguard.com/auth/verify-access` returned 401 in 1,799 ms while logged out.

Empty fields leave Log in disabled. The address `not-an-email` also leaves it disabled. The field's validation message was "Please include an '@' in the email address. 'not-an-email' is missing an '@'." That sentence was not shown in the page text.

`dashboard-check@example.com` with a fake password enabled Log in. The button changed to "Signing in...". `POST /auth/email-login` returned 400 in 2,432 ms. A toast then read "Error" and "Invalid email or password. Please check your credentials and try again." The visible toast was cut off before "again." The toast then cleared. Screenshot: `evidence/dashboard-fresh/screenshots/dash-fresh-login-error.png`.

## Forgot password and sign up

Forgot password stays on `/login` and shows "No worries, we'll send you reset instructions." Reset Password is disabled until the email looks valid. One reset for `dashboard-check@example.com` showed "Sending reset link..." and then "Success. If an account with this email exists, a password reset link has been sent." The view returned to the login card. The success toast was gone before the following screenshot.

Sign up stays on `/login`. It says "Map, Analyze, and Generate Reports — All For Free." and "Use at least 8 characters." Sign up for free was disabled with empty fields. Terms of Use and Privacy Policy both use `https://www.fortyguard.com/privacypolicy`. A fetch of that URL returned HTTP 404.

## Routes

`/map` while logged out returned to `/login`. The navigation entry for that load was 3,361 ms and HTTP 200.

`/settings` while logged out changed the address to `/` and left a black page. `forty-root` contained only a toast and an empty router outlet. Samples about 0.7 seconds apart stayed at text length 0 for six samples, and a further 5 second wait was still blank. A later direct load of `/` reached `/login` after `verify-access` returned 401 in 267 ms. The document timing on that successful login arrival was 641 ms.

## Layout

| Viewport | Horizontal overflow | Login card |
| --- | --- | --- |
| 1440 × 900 | No. Scroll size 1440 × 900. | 400 × 507 at left 520, top 197. Centered. |
| 1280 × 800 | No. | 400 × 507 at left 440, top 147. Centered. |
| 390 × 844 | No. Scroll size 390 × 844. | The form remained readable in the mobile screenshot. |

Touch input was not tested. Map zoom, pan, legend, settings content, and Feature Updates were not reached.
