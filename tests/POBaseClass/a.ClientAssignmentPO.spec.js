const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageobjects/LoginPage');


test('Web Client App login with PageObjects', async ({ page }) => {
   //js file- Login js, DashboardPage
   const useremail = "murali535@gmail.com";
   const password = "Value*535";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");

   //creating an object of LoginPage class

   const loginPage = new LoginPage(page);

   //calling the method of LoginPage class
   await loginPage.LandingPageUrl();
   await loginPage.validLogin(useremail, password);

   //    await page.waitForLoadState('networkidle'); // sometime networkidle is flacky
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

})