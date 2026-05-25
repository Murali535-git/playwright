//when we are doing the assertions we need expect, so call the library and assign to const

// const { test} = require('@playwright/test');
// const { expect } = require('@playwright/test');

// or 

const { test, expect} = require('@playwright/test'); // here we are importing both test and expect from the playwright library and assigning to const

test('Test login function with browser context', async ({browser}) => {

    //here we need to pass chrome-- pulgins/ cookies
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});


test('Test login function', async ({page}) => {

    await page.goto('https://google.com');

    //assertion on page title
    console.log(await page.title()); // here we are printing the title of the page in the console
    // expect(await page.title()).toBe('Google'); // here we are asserting that the title of the page is Google

    await expect(page).toHaveTitle('Google'); // here we are asserting that the title of the page is Google using the expect library
});