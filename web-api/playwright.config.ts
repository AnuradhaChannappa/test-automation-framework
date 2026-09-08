import { defineConfig, devices } from '@playwright/test';
import { webBaseurl } from './config/env';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    /* resolve the base url from the environment variable or use a default value */
        baseURL: webBaseurl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

/***
  test.only('Login test', async ({ page }) => {
   // ...
});

test('Search flight', async ({ page }) => {
   // ...
});

test('Book flight', async ({ page }) => {
   // ...
});

Locally:

Login test

runs because you intentionally used .only.

In CI:

Playwright sees:

test.only(...)

and fails the build instead of silently running just one test.


"I would be careful with retries because they can mask real failures. I would use retries only for known transient CI/environment issues, not as a way to make a test pass. For an A/B test specifically, I would make the experiment deterministic by controlling the variant, and then validate each variant independently. If a test passes only after a retry, I'd treat that as a signal of flakiness and investigate it rather than ignoring it."
 * 
 * * */