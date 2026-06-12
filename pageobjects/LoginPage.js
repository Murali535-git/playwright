class LoginPage {

    constructor(page) {
        this.page = page;
        this.useremail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("[value='Login']");
    }

    async LandingPageUrl() {

        await this.page.goto("https://rahulshettyacademy.com/client");

    }

    async validLogin(useremail, password) {
        await this.useremail.fill(useremail);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

}

module.exports = { LoginPage };