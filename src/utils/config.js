require('dotenv').config();

module.exports = {
    browserType: browserType,
    userDataDir: process.env.CHROME_USER_DATA,
    profileDir: process.env.PROFILE,
    baseUrl: process.env.BASE_URL || 'https://www.google.com',
    executablePath: browserType === 'edge' ? process.env.EDGE_PATH : process.env.CHROME_PATH,
    userDataDir: browserType === 'edge' ? process.env.EDGE_USER_DATA : process.env.CHROME_USER_DATA,
    headless: process.env.HEADLESS === 'true'
};