const { test, expect } = require('@playwright/test');
const { POManager } = require ('../../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../../utils/placeorderTestData.json')));

//To handle JSON data, we need to follow best approch
//JSON --> String -->Java Script Object
//JSON--> String {JSON.stringify()} --> Java script Object {JSON.parse() }

//to handle multiple datset we need to iterate the data using loop

for(const data of dataset) {

test(`E2e With multiple TestData pass from JSON file ${data.productName}`, async ({ page }) => {

    const cardNumber = "4542 9931 9292 2293";
    const cvv = "123";
    const name = "Murali";
    const countryName = "Ind";

    const poManager = new POManager(page);

    //Here login object is not required and we call from PO manager
    const loginpage = poManager.getLoginPage();
    await loginpage.LandingPageUrl();
    await loginpage.validLogin(data.useremail, data.password);

    //here also no object needed
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart(data.productName);

    //here also no object needed
    const cartPage= poManager.getCartPage();
    await cartPage.validateCartList(data.productName);
    await dashboardPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.creditCardDetails(cardNumber, cvv, name);
    //Shipping details
    await checkoutPage.shippingDetails(countryName, data.useremail);

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

}