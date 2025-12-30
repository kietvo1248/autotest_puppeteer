const { expect } = require('chai');
const { initBrowser } = require('../utils/browser');
const LoginPage = require('../pages/LoginPage');
const data = require('../../Data/data_saucedemo');

describe('Kiểm thử chức năng Đăng nhập Saucedemo', function() {
    this.timeout(60000); 
    let browser, page, loginPage;

    before(async () => {
        ({ browser, page } = await initBrowser());
        loginPage = new LoginPage(page);
    });

    after(async () => {
        await browser.close();
    });

    it('TC01: Đăng nhập thành công với thông tin đúng', async () => {
        await loginPage.navigate(data.url);
        await loginPage.login(data.userName, data.password);
        expect(page.url()).to.include('/inventory.html');
    });

    it('TC02: Đăng nhập thất bại khi sai thông tin', async () => {
        await loginPage.navigate(data.url);
        await loginPage.login(data.fakeUserName, data.password);
        const error = await loginPage.getErrorMessage();
        expect(error).to.include('Username and password do not match');
    });
});