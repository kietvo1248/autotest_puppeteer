const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--user-data-dir=C:\\Users\\KIET\\AppData\\Local\\Google\\Chrome\\User Data',
            '--profile-directory=Profile 1'
        ]
    });

    const page = await browser.newPage();

    // Log errors and console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('error', err => console.error('PAGE ERROR:', err));

    // Set viewport to maximize the window
    const { width, height } = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });
    await page.setViewport({ width, height });

    try {
        await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });
        console.log('Navigation successful');
    } catch (err) {
        console.error('Failed to navigate:', err);
    }

    // await browser.close();
})();
