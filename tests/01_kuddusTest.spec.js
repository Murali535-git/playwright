const { test, expect } = require('@playwright/test');
test('validate UI for interview page for Kuddus', async ({ page }) => {
  await page.goto('https://demoqa.com/progress-bar');
 
 //validate the page title
 const title = await page.title();
 expect(title).toBe('demosite');

 console.log('Page title is correct:', title);
   });