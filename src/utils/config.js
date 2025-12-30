require('dotenv').config();

module.exports = {
    userDataDir: process.env.CHROME_USER_DATA,
    profileDir: process.env.CHROME_PROFILE,
    baseUrl: process.env.BASE_URL || 'https://www.google.com',
    headless: process.env.HEADLESS === 'true'
};