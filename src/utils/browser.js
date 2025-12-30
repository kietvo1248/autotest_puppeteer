const puppeteer = require('puppeteer-core'); // Dùng core để trỏ đến trình duyệt có sẵn
const config = require('./config');

async function launchBrowser() {
    console.log(`--- Đang khởi tạo trình duyệt: ${config.browserType.toUpperCase()} ---`);
    
    try {
        const browser = await puppeteer.launch({
            executablePath: config.executablePath, // Đường dẫn đến Chrome hoặc Edge
            headless: config.headless,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
            userDataDir: config.userDataDir // Sử dụng profile người dùng tương ứng
        });

        const page = await browser.newPage();
        
        const { width, height } = await page.evaluate(() => ({
            width: window.screen.width,
            height: window.screen.height
        }));
        await page.setViewport({ width, height });

        return { browser, page };
    } catch (error) {
        console.error(`Lỗi khi khởi tạo ${config.browserType}:`, error.message);
        throw error;
    }
}

module.exports = { launchBrowser };