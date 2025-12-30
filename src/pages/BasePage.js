class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, { waitUntil: 'networkidle2' });
    }

    async waitAndClick(selector) {
        await this.page.waitForSelector(selector, { timeout: 30000 });
        await this.page.click(selector);
    }

    async waitAndType(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text, { delay: 50 });
    }
}
module.exports = BasePage;