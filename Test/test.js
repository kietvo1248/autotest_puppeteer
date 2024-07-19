const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const input = 'chùa hoằng pháp trung ương ở củ chi'; // Define the input here

const logFilePath = path.join(__dirname, 'Log', 'log_Test.txt');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    // Set the viewport to the maximum screen resolution
    const { width, height } = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });
    await page.setViewport({ width, height });

    const startTime = new Date().toISOString();

    try {
        await page.goto('https://www.google.com/');
        const searchBoxSelector = 'textarea[name="q"]';
        await page.waitForSelector(searchBoxSelector);
        await page.type(searchBoxSelector, input, { delay: 100 });
        await page.keyboard.press('Enter');
        await page.waitForNavigation();

        // Check if the search results page loaded correctly
        const resultsSelector = '#search';
        await page.waitForSelector(resultsSelector);

        // Log success
        const endTime = new Date().toISOString();
        const successMessage = `Test successfully\nStart time: ${startTime}\nEnd time: ${endTime}\n\n`;
        fs.appendFileSync(logFilePath, successMessage);
        console.log('Test successfully');
    } catch (error) {
        // Log failure and error details
        const endTime = new Date().toISOString();
        const errorMessage = `Test failed\nStart time: ${startTime}\nEnd time: ${endTime}\nError: ${error.message}\n\n`;
        fs.appendFileSync(logFilePath, errorMessage);
        console.log('Test failed');
    } finally {
        // Uncomment the following line to close the browser
        // await browser.close();
    }

    console.log(`Log file written to: ${logFilePath}`);
})();
