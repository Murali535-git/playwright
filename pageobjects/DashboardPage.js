class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async searchProductAddCart(productName) {

        //await this.productsText .first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) 
            {
                await this.products.nth(i).locator('button:has-text("Add To Cart")').click();
                break;
            }
        }

    }

    async navigateToCart(productName) {

       await  this.cartButton.click();
    }

    
    async navigateToCheckout(){
        await this.checkoutButton.click();
    }

}

module.exports = { DashboardPage };