require('dotenv').config();

module.exports = {
    browserType: process.env.BROWSER_TYPE || 'chrome',
    headless: process.env.HEADLESS === 'true',
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/'
};