// web lỏd: https://automationexercise.com/
// Test Case: https://automationexercise.com/test_cases
// API list: https://automationexercise.com/api_list

//TC01: Đăng ký tài khoản mới và xóa tài khoản
//TC02: Đăng ký và đăng nhập
//TC03: Xem $ search tên sản phẩm
//TC04: khách hàng đăng nhập tạo Thêm sản phẩm vào giỏ hàng và thanh toán


const BasePage = require("../pages/BasePage");
const { expect } = require("chai");
const { launchBrowser } = require("../utils/browser");
const AuthenticatePage = require("../pages/automationexercise/authenticatePage");
const data = require("../../Data/data_automationexercise");
const basePage = "https://automationexercise.com/";

describe("Quy trình đăng ký và xóa tài khoản trên Automation Exercise",  async function () {
  this.timeout(60000);
  let browser, page, authenticatePage; 
    before(async () => {
        ({ browser, page } = await launchBrowser());
        authenticatePage = new AuthenticatePage(page);
    });

    after(async () => {
        if (browser) {
            await browser.close();
        }
    });
    it("TC01: Đăng ký tài khoản mới và xóa tài khoản", async () => {
        // 1. Launch browser
        // 2. Navigate to url 'http://automationexercise.com'
        await authenticatePage.navigate(basePage);
        // 3. Verify that home page is visible successfully
        // expect(page.url()).to.equal("https://automationexercise.com/");
        // 4. Click on 'Signup / Login' button
        await authenticatePage.waitAndClick("a[href='/login']");
        // 5. Fill all details in Signup and create account
        await authenticatePage.register(data);
        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        let message = await authenticatePage.getMessage();
        expect(message).to.include("Account Created!");
        await authenticatePage.clickContinue();
        // 7. Verify 'Logged in as username' at top
        message = await authenticatePage.getWelcomeMessage();
        expect(message).to.include(`Logged in as ${data.name}`);
        // 8. Delete account and verify 'ACCOUNT DELETED!'
        await authenticatePage.deleteAccount();
        message = await authenticatePage.getMessage();
        expect(message).to.include("Account Deleted!");
        console.log("--- Đăng ký và xóa tài khoản thành công! ---");
    });

    it("TC02: Đăng ký và đăng nhập", async () => {
        await authenticatePage.navigate(basePage);
        // 3. Verify that home page is visible successfully
        // expect(page.url()).to.equal("https://automationexercise.com/");
        // 4. Click on 'Signup / Login' button
        await authenticatePage.waitAndClick("a[href='/login']");
        // 5. Fill all details in Signup and create account
        await authenticatePage.register(data);
        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        let message = await authenticatePage.getMessage();
        expect(message).to.include("Account Created!");
        await authenticatePage.clickContinue();
        // 7. Verify 'Logged in as username' at top
        message = await authenticatePage.getWelcomeMessage();
        expect(message).to.include(`Logged in as ${data.name}`);
        // 8. Logout
        await authenticatePage.waitAndClick("a[href='/logout']");
        // 9. Login again with the created account
        await authenticatePage.login(data.fakeEmail, data.password);
        // 10. Verify 'Logged in as username' at top
        message = await authenticatePage.getWelcomeMessage();
        expect(message).to.include(`Logged in as ${data.name}`);

        // cleanup: delete account
        await authenticatePage.deleteAccount();
    });
});

