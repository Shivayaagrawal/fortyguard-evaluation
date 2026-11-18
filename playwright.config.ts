import { defineConfig, devices } from "@playwright/test";

/**
 * Dashboard browser checks start in Phase 2.
 * Browsers are not downloaded during planning.
 * Do not point this at an authenticated session until the user is present.
 */
export default defineConfig({
  testDir: "./tests/dashboard",
  timeout: 60_000,
  use: {
    baseURL: process.env.FORTYGUARD_DASHBOARD_URL ?? "https://dashboard.fortyguard.com/login",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
});
