// src/pages/LoginPage.js
const BasePage = require('../BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.userNameBox = 'input[name="user-name"]';
        this.passwordBox = 'input[name="password"]';
        this.loginButton = '#login-button';
        this.errorMsg = 'h3[data-test="error"]';
    }

    async login(username, password) {
        await this.waitAndType(this.userNameBox, username);
        await this.waitAndType(this.passwordBox, password);
        await this.waitAndClick(this.loginButton);
    }
    
    async getErrorMessage() {
        // Phải đợi selector xuất hiện trước khi eval text (Fix lỗi không tìm thấy element)
        await this.page.waitForSelector(this.errorMsg);
        return await this.page.$eval(this.errorMsg, el => el.textContent);
    }
}
module.exports = LoginPage;