
const { launchBrowser } = require('../utils/browser');

describe('Cross-Browser Test', function() {
    let browser, page;

    before(async () => {
        ({ browser, page } = await launchBrowser());
    });

    it('Mở trang thành công', async () => {
        await page.goto('https://www.google.com');
    });

    after(async () => {
        if (browser) {
            await browser.close();
        }
    });
});