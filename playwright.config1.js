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
    trace : 'retain-on-failure', // here we will get the trace for only failed test cases, so that we can analyze the failed test cases and we can also see the video for failed test cases
    ignoreHTTPSErrors: true, // here we will ignore the HTTPS errors, so that we can test the application which is running on HTTPS and having self signed certificate
    screenshot: 'on',
    video: 'on',

      projects: [
    {

      // below paramater configration helps to run in chrome for the Iphone 13 pro device and also we can run in firefox and safari as well
      // command to run the test cases in all the browsers -- npx playwright test --config playwright.config1.js--project=chromium
      name: 'chromium',
      use: { 
        browserName: 'chromium', // here we we specified the browser chrome
        headless: false, // here we specified the headless mode to true, so that the browser will not be visible when the test is running
        trace : 'retain-on-failure', // here we will get the trace for only failed test cases, so that we can analyze the failed test cases and we can also see the video for failed test cases
        ignoreHTTPSErrors: true, // here we will ignore the HTTPS errors or SSL errors, so that we can test the application which is running on HTTPS and having self signed certificate
        permissions: ['geolocation'], // here we will give the permission to access the geolocation, so that we can test the application which is using the geolocation
        screenshot: 'on',
        video: 'on',
        ...devices['iPhone 13 Pro'], // here we specified the device as iPhone 13 Pro, so that we can test the application on mobile view
      
      
      },
    },
    {
  
      name: 'firefox',
      use: { 
       browserName: 'firefox', // here we we specified the browser firefox
       headless: true, // here we specified the headless mode to true, so that the browser will not be visible when the test is running
       trace : 'retain-on-failure', // here we will get the trace for only failed test cases, so that we can analyze the failed test cases and we can also see the video for failed test cases
       ignoreHTTPSErrors: true, // here we will ignore the HTTPS errors, so that we can test the application which is running on HTTPS and having self signed certificate
       screenshot: 'only-on-failure', // here we will get the screenshot for only failed test cases, so that we can analyze the failed test cases and we can also see the video for failed test cases
       video: 'on',
       viewport: { width: 720, height: 720 }, // here we specified the viewport as 720x720, so that we can test the application on mobile view
      
      },


    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    ]
  },


});

