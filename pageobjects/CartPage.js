const {expect} = require('@playwright/test');

class CartPage{

    constructor(page){
        this.page=page;
        this.cartList= page.locator("div li");
    }

    async validateCartList(productName){
        await this.cartList.first().waitFor();
        const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible();
        expect(bool).toBeTruthy();
    }

}

module.exports = { CartPage };