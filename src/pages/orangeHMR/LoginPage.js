const BasePage = require('../BasePage');
class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.userNameBox = "input[placeholder='Username']";
        this.passwordBox = "input[placeholder='Password']";
        this.loginButton = "button[type='submit']";
        this.errorMsg = ".oxd-text.oxd-text--p.oxd-alert-content-text";
        this.dropdownMenu = '.oxd-userdropdown-tab';
        this.logoutButton = "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > header:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)";
        
    }
    async login(username, password) {
        await this.waitAndType(this.userNameBox, username);
        await this.waitAndType(this.passwordBox, password);
        await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
        this.page.click(this.loginButton)
    ]);
    }

    async logout() {
        await this.waitAndClick(this.dropdownMenu);
        await this.waitAndClick(this.logoutButton);
    }

    async getErrorMessage() {
        await this.page.waitForSelector(this.errorMsg);
        return await this.page.$eval(this.errorMsg, el => el.textContent);
    }
}
module.exports = LoginPage;