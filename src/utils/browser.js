const puppeteer = require('puppeteer');
const config = require('./config');

async function launchBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: config.headless,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                `--profile-directory=${config.profileDir}`
            ],
            userDataDir: config.userDataDir // Đưa đường dẫn nhạy cảm vào đây
        });

        const page = await browser.newPage();
        
        const { width, height } = await page.evaluate(() => ({
            width: window.screen.width,
            height: window.screen.height
        }));
        await page.setViewport({ width, height });

        return { browser, page };
    } catch (error) {
        console.error('Không thể mở trình duyệt:', error);
        throw error;
    }
}

module.exports = { launchBrowser };