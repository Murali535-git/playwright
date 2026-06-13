class LoginPage {

    constructor(page) {
        this.page = page;
        this.useremail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("[value='Login']");
        this.networkidle= page.waitForLoadState('networkidle');
    }

    async LandingPageUrl() {

        await this.page.goto("https://rahulshettyacademy.com/client");

    }

    async validLogin(useremail, password) {
        await this.useremail.fill(useremail);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.networkidle;
    }

}

// we need to export
//if we are not export then we cannot access this class in other files, so we need to export this class to use it in other files like test files or other page objects files
//(or) if we are not export this will not available for public


module.exports = { LoginPage };