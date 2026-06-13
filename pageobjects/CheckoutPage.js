const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.cardNumber = page.locator("input[type='text'][class='input txt text-validated']");
        this.dateDropdown = page.locator("select[class='input ddl']");
        this.textCardArea = page.locator("input[class='input txt']");
        this.shippingCountryText = page.locator("input[placeholder='Select Country']");
        this.countryDropdown = page.locator(".ta-results");

    }

    async creditCardDetails(cardNumber, cvv, name) {

        await this.cardNumber.fill("");
        await this.cardNumber.fill(cardNumber);

        await this.dateDropdown.nth(0).selectOption("02");
        await this.dateDropdown.nth(1).selectOption("24");

        await this.textCardArea.first().fill(cvv);
        await this.textCardArea.last().fill(name);

    }

    async shippingDetails(countryName, useremail) {

        await this.shippingCountryText.pressSequentially(countryName); 

        const countryDropdown = this.countryDropdown;
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
        
            expect(await this.page.locator(".user__name [type='text']").first()).toHaveText(useremail);
            await this.page.locator(".action__submit").click();
        
    }     

}
module.exports = { CheckoutPage };