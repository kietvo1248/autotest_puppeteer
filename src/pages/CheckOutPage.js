const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueBtn = '#continue';
        this.finishBtn = '#finish';
        this.errorMsg = 'h3[data-test="error"]';
    }

    async fillInfo(fname, lname, zip) {
        if (fname) await this.waitAndType(this.firstNameInput, fname);
        if (lname) await this.waitAndType(this.lastNameInput, lname);
        if (zip) await this.waitAndType(this.postalCodeInput, zip);
        await this.waitAndClick(this.continueBtn);
    }

    async clickFinish() {
        await this.waitAndClick(this.finishBtn);
    }
}
module.exports = CheckoutPage;