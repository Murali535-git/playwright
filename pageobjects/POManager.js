//PO Manager will help us to create objects of all the pages and we can call those objects in our test cases
// we can also create objects of the pages in the test cases but it is not a good practice because it will create a lot of objects and it will be difficult to manage them
// so we will create a PO Manager and we will create objects of all the pages in the PO Manager and we will call those objects in our test cases

const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.dashboardpage = new DashboardPage(page);
        this.cartpage = new CartPage(page);
        this.checkoutpage = new CheckoutPage(page);
    }

    getLoginPage() {
        return this.loginpage;
    }   

    getDashboardPage() {
        return this.dashboardpage;
    }

    getCartPage() {
        return this.cartpage;
    }

    getCheckoutPage() {
        return this.checkoutpage;
    }
}

module.exports = { POManager };