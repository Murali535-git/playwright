const { test, expect } = require('@playwright/test');
const path = require('node:path');

test('Screenshot and visual validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#displayed-text').screenshot({ path: 'screenshot.png' }); // here we are taking a screenshot of the element and saving it in the current directory with the name screenshot.png


    await expect(page.locator('#displayed-text')).toBeVisible(); // here we are asserting that the element is visible using the expect library
    await page.locator('#hide-textbox').click();

    await page.screenshot({path: 'screenshot2.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();

});

test('@VS Visual validation with toHaveScreenshot', async ({ page }) => {
    await page.goto('https://google.com ');
    expect (await page.screenshot()).toMatchSnapshot('google-homepage.png'); // here we are taking a screenshot of the entire page and comparing it with the existing screenshot in the current directory with the name google-homepage.png
   // await expect(page).toHaveScreenshot(path.join(__dirname, 'google-homepage.png'), { fullPage: true }); // here we are taking a screenshot of the entire page and comparing it with the existing screenshot in the current directory with the name google-homepage.png

});