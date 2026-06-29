// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',
  retries: 1, // here we specified the retry count to 1, so that if the test case fails then it will retry for 1 time and if it fails again then it will mark as failed
  workers: 3, // here we specified the workers count to 3, so that it will run 3 test cases in parallel and it will reduce the execution time
  timeout: 30 * 1000, // by default we have 30 sec, but gobally we can change now changed to 40 sec
  expect: {
    timeout: 5000, // default timeout for expect assertions is 5 seconds
  },

  reporter: 'html', // here we specified the html report

  //Use the core property

  use: {
    // browserName: 'chromium', // here we we specified the browser chrome

    headless: false, // here we specified the headless mode to true, so that the browser will not be visible when the test is running
    // trace: 'on', // will give all logs for both passed and failed test cases
    //Off will off the trace, ON means will get traces
    trace: 'on', // here we will get the trace for only failed test cases, so that we can analyze the failed test cases and we can also see the video for failed test cases
    ignoreHTTPSErrors: true, // here we will ignore the HTTPS errors, so that we can test the application which is running on HTTPS and having self signed certificate
    screenshot: 'on',
    video: 'retain-on-failure',// we can use 'on' or 'retain-on-failure' for video recording, 'on' will record video for all test cases, 'retain-on-failure' will record video only for failed test cases and remove all sucesful test case video
    // video: 'on', // we can use 'on' will record video for all test cases, so lot of memory will be consumed
    // Video 'retain on-failure' will record video only for failed test cases and remove all sucesful test case video, so less memory will be consumed
    // video 'on-first-retry' Record video only when retrying a test for the first time.
    // video 'off' will not record video for any test cases, so less memory will be consumed
    // video 'on' will record video for all test cases, so lot of memory will be consumed

    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ]
  },

  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('')`. */
  //   // baseURL: 'http://localhost:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  // },

  // /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   // {
  //   //   name: 'firefox',
  //   //   use: { ...devices['Desktop Firefox'] },
  //   // },

  //   // {
  //   //   name: 'webkit',
  //   //   use: { ...devices['Desktop Safari'] },
  //   // },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // // web responsive testing -- viewport : {width : 720, height : 720} -- mobile view port 
  //   // },
  // ],

  // /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

