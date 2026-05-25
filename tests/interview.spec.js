// const {test,expect}= require('@playwright/test');

// const bar=[{
//     min:20,
//     max:65
// }];

// test.only('validate interview page', async ({page})=>{

    // await page.goto('https://demoqa.com/progress-bar');

    //   await page.locator('#startStopButton').click();

    //    await page.locator('.progress-bar').waitFor();

    // await page.locator('.progress-bar').textContent();
    // await page.locator('div[aria-valuenow="65"]');

    // // if(maxBar===bar[0].max.toString())
    // // // expect(value).toBe(bar[0].max.toString());

    // //button -- id="startStopButton"

    // const button= page.locator('#startStopButton');

    // await button.click();

//         await page.pause();
// });

const { test, expect } = require('@playwright/test');

test('validate interview page', async ({ page }) => {
  await page.goto('https://demoqa.com/progress-bar');

  const button = page.locator('#startStopButton');
  const progressBar = page.locator('.progress-bar');

  // Start the process
  await button.click();

//   // Wait until progress reaches 65
//   await expect(progressBar).toHaveAttribute('aria-valuenow', '65');
//     timeout: 15000;

await expect.poll(async () => {
  return Number(await progressBar.getAttribute('aria-valuenow'));
}, {
  timeout: 15000
}).toBeGreaterThanOrEqual(61);

  // Stop the process
 await  button.click();

  await page.pause();
});
