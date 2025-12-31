// src/pages/CheckOutPage.js
const BasePage = require('./BasePage');

class CheckOutPage extends BasePage {
    constructor(page) {
        super(page);
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueBtn = '#continue';
        this.finishBtn = '#finish';
        this.errorMsg = 'h3[data-test="error"]'; // Selector chung cho lỗi ở checkout
    }

    async fillInfo(fname, lname, zip) {
        // Sử dụng waitAndType đã sửa lỗi để tự động xóa nội dung cũ
        await this.waitAndType(this.firstNameInput, fname || '');
        await this.waitAndType(this.lastNameInput, lname || '');
        await this.waitAndType(this.postalCodeInput, zip || '');
        await this.waitAndClick(this.continueBtn);
    }

    async getErrorMessage() {
        await this.page.waitForSelector(this.errorMsg);
        return await this.page.$eval(this.errorMsg, el => el.textContent);
    }

    async clickFinish() {
        await this.waitAndClick(this.finishBtn);
    }
}
module.exports = CheckOutPage;