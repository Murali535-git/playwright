const { test, expect } = require('@playwright/test');
const { POManager } = require ('../../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../../utils/c1.WebE2ePOManager-placeorderTestData.json')));


//To handle JSON data, we need to follow best approch
//JSON --> String -->Java Script Object
//JSON--> String {JSON.stringify()} --> Java script Object {JSON.parse() }

//NOte: here we have only one dataset


test('Data parameterization with JSON', async ({ page }) => {

    const poManager = new POManager(page);

    const loginpage = poManager.getLoginPage();
    await loginpage.LandingPageUrl();
    await loginpage.validLogin(dataset.useremail, dataset.password);


});