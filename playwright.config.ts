import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const defaultBaseURL = "http://127.0.0.1:3000";
const baseURL = process.env.BASE_URL ?? defaultBaseURL;
const isCI = !!process.env.CI;

if (isCI && !process.env.BASE_URL) {
  throw new Error(
    "BASE_URL is required in CI. Add it as a GitHub Actions secret before running the workflow.",
  );
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* In CI the JSON results feed the published run summary (scripts/summarize-run.mjs). */
  reporter: isCI
    ? [
        ["github"],
        ["list"],
        ["html", { open: "never" }],
        ["json", { outputFile: "results/results.json" }],
      ]
    : [["list"], ["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    /* CI keeps a trace for every test so the published report opens in the trace viewer.
       See https://playwright.dev/docs/trace-viewer */
    trace: isCI ? "on" : "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "desktop-chromium",
      testIgnore: /responsive\.test\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },

    /* Test against mobile viewports. */
    {
      name: "mobile-chromium",
      testIgnore: [/localization\.test\.ts/, /navigation\.test\.ts/],
      use: { ...devices["Pixel 5"] },
    },
  ],
});
