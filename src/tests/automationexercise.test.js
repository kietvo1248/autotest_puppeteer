// web lỏd: https://automationexercise.com/
// Test Case: https://automationexercise.com/test_cases
// API list: https://automationexercise.com/api_list

const BasePage = require("../pages/BasePage");
const { expect } = require("chai");
const { launchBrowser } = require("../utils/browser");
const RegisterPage = require("../pages/automationexercise/resgisterPage");
const data = require("../../Data/data_automationexercise");
const basePage = "https://automationexercise.com/";

describe("Quy trình đăng ký và xóa tài khoản trên Automation Exercise",  async function () {
  this.timeout(60000);
  let browser, page, registerPage; 
    before(async () => {
        ({ browser, page } = await launchBrowser());
        registerPage = new RegisterPage(page);
    });

    after(async () => {
        if (browser) {
            await browser.close();
        }
    });
    it("TC01: Đăng ký tài khoản mới và xóa tài khoản", async () => {
        // 1. Launch browser
        // 2. Navigate to url 'http://automationexercise.com'
        await registerPage.navigate(basePage);
        // 3. Verify that home page is visible successfully
        // expect(page.url()).to.equal("https://automationexercise.com/");
        // 4. Click on 'Signup / Login' button
        await registerPage.waitAndClick("a[href='/login']");
        // 5. Fill all details in Signup and create account
        await registerPage.register(data);
        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        let message = await registerPage.getMessage();
        expect(message).to.include("Account Created!");
        await registerPage.clickContinue();
        // 7. Verify 'Logged in as username' at top
        message = await registerPage.getWelcomeMessage();
        expect(message).to.include(`Logged in as ${data.name}`);
        // 8. Delete account and verify 'ACCOUNT DELETED!'
        await registerPage.deleteAccount();
        message = await registerPage.getMessage();
        expect(message).to.include("Account Deleted!");
        console.log("--- Đăng ký và xóa tài khoản thành công! ---");
    });
});

