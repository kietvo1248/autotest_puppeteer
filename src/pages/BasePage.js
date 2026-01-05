// src/pages/BasePage.js
class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, { waitUntil: 'networkidle2' });
    }
    async pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitAndClick(selector) {
        await this.page.waitForSelector(selector, { timeout: 30000 });
        await this.page.click(selector);
    }

    async waitAndType(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector, { clickCount: 3 });
        await this.page.keyboard.press('Backspace');
        await this.page.type(selector, text, { delay: 70 }); // Tăng delay gõ phím để trông thật hơn
    }
    async waitAndSelect(selector, value) { // thêm hàm chọn dropdown
        await this.page.waitForSelector(selector, { timeout: 30000 });
        await this.pause(500); 
        await this.page.select(selector, value);
    }
    async waitAndGetText(selector) {
        await this.page.waitForSelector(selector, { timeout: 30000 });
        return await this.page.$eval(selector, el => el.textContent);
    }
}
module.exports = BasePage;