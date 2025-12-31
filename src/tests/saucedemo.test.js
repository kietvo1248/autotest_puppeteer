const { expect } = require('chai');
const { launchBrowser } = require('../utils/browser');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CheckoutPage = require('../pages/CheckOutPage');
const data = require('../../Data/data_saucedemo');

describe('Quy trình mua hàng Saucedemo (E2E)', function() {
    this.timeout(60000); 
    let browser, page, loginPage, inventoryPage, checkoutPage;

    before(async () => {
        ({ browser, page } = await launchBrowser());
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    after(async () => {
        await browser.close();
    });

    // --- TEST LOGIN ---
    it('TC01: Đăng nhập thành công', async () => {
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login(data.userName, data.password);
        expect(page.url()).to.include('/inventory.html');
    });

    it('TC02: Đăng nhập thất bại - Sai thông tin', async () => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login(data.fakeUserName, data.fakePassword);
        const error = await loginPage.getErrorMessage();
        expect(error).to.include('Username and password do not match');
    });

    it('TC03: Đăng nhập thất bại - Thiếu password', async () => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login(data.userName, data.emptyPassword);
        const error = await loginPage.getErrorMessage();
        expect(error).to.include('Password is required');
    });

    // --- TEST SHOPPING & CHECKOUT ---
    it('TC04: Quy trình thêm hàng vào giỏ và thanh toán', async () => {
        // Tái đăng nhập để làm mới session
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login(data.userName, data.password);

        // Thêm và xóa sản phẩm
        await inventoryPage.addItem('sauce-labs-bolt-t-shirt');
        await inventoryPage.removeItem('sauce-labs-bolt-t-shirt');
        await inventoryPage.addItem('sauce-labs-bike-light');
        await inventoryPage.addItem('sauce-labs-backpack');
        
        await inventoryPage.goToCart();
        await page.click('#checkout');

        // Case 4: Để trống form checkout
        await checkoutPage.fillInfo('', '', '');
        let error = await loginPage.getErrorMessage();
        expect(error).to.include('First Name is required');

        // Case 5: Thiếu Postal Code
        await page.reload();
        await checkoutPage.fillInfo(data.firstName, data.lastName, '');
        error = await loginPage.getErrorMessage();
        expect(error).to.include('Postal Code is required');

        // Case 6: Điền đủ thông tin và hoàn tất
        await page.reload();
        await checkoutPage.fillInfo(data.firstName, data.lastName, data.postalCode);
        expect(page.url()).to.include('/checkout-step-two.html');

        await checkoutPage.clickFinish();
        expect(page.url()).to.include('/checkout-complete.html');
    });
});