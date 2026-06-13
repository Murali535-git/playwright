const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
//const { title } = require('process');

test('Online Web E2E Scenario with PageObjects-Scenario with dashboard', async ({ page }) => {

    const useremail = "murali535@gmail.com";
    const password = "Value*535";
    const productName = "ZARA COAT 3";

    const loginpage = new LoginPage(page);
    await loginpage.LandingPageUrl();
    await loginpage.validLogin(useremail, password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart(productName);

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    //Checkout validation:

    await page.locator("button:has-text('Checkout')").click();

    //Checkout filling card details

    await page.locator("input[type='text'][class='input txt text-validated']").fill(""); // to remove existing text
    await page.locator("input[type='text'][class='input txt text-validated']").fill("4542 9931 9292 2293");// provide the new card number

    const dateDropdown = page.locator("select[class='input ddl']");
    await dateDropdown.nth(0).selectOption("02"); // select Date
    await dateDropdown.nth(1).selectOption("24"); // select month

    //CVV

    const textArea = page.locator("input[class='input txt']");
    await textArea.first().fill("123");
    await textArea.last().fill("Murali");

    //Shipping details

    await page.locator("input[placeholder='Select Country']").pressSequentially("Ind");

    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.waitFor(); // wait for the dropdown to appear

    const optionsCount = await countryDropdown.locator("button").count();
    console.log(optionsCount); // to see how many options are there in the dropdown
    for (let i = 0; i < optionsCount; i++) {

        const text = await countryDropdown.locator("button").nth(i).textContent();
        // if(text.trim()==="India") -- here we are removing the spaces
        if (text === " India") {
            await countryDropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(useremail);
    await page.locator(".action__submit").click();

    // need to validate the order confirmation message "https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%2269e32767f86ba51a656ffce7%22%5D"
    // " Thankyou for the order. "

    // order confirmation is displayed on the same page after clicking Place Order
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
    const orderConfirmationMessage = await page.locator(".hero-primary").textContent();
    await expect(orderConfirmationMessage).toBe(" Thankyou for the order. ");

    // display the confirmation message in the console
    console.log(orderConfirmationMessage);

    //displaying the orderId 
    const expectedOrder_id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("new order Id:" + expectedOrder_id);

    //validating the orders
    await page.locator(".btn-custom .fa-handshake-o").click();
    
    await page.locator("tbody").waitFor(); // this helps to load the complete table

    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (expectedOrder_id.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(expectedOrder_id.includes(orderIdDetails)).toBeTruthy();


});