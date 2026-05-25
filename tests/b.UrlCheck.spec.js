const { test} = require('@playwright/test');

test('Test login function with browser context', async ({browser}) => {

    //here we need to pass chrome-- pulgins/ cookies
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://google.com');
});


//if we want to execute specific test the give test.only

test('Test login function', async ({page}) => {

    //  test.only('Test login function', async ({page}) => {

// When we are using page as a parameter and fixture, then we don't need to create a new context and page, because it will be automatically created for us by the playwright
// directly use the page fixture to navigate to the URL
    //here we need to pass chrome-- pulgins/ cookies
    // const context= await browser.newContext();
    // const page= await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});