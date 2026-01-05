// web lỏd: https://opensource-demo.orangehrmlive.com/
const { expect } = require("chai");
const { launchBrowser } = require("../utils/browser");
const LoginPage = require("../pages/orangeHMR/LoginPage");
const data = require("../../Data/data_orange");

describe("Quy trình đăng nhập OrangeHRM",  async function () {
  this.timeout(60000);
  let browser, page, loginPage;

  before(async () => {
    ({ browser, page } = await launchBrowser());
    loginPage = new LoginPage(page);
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it("TC01: Đăng nhập thành công", async () => {
    await loginPage.navigate("https://opensource-demo.orangehrmlive.com/");
    await loginPage.login(data.userName, data.password);
    expect(page.url()).to.include("/web/index.php/dashboard/index");
    await loginPage.pause(2000);
  });

  it("Đăng xuất", async () => {
    await loginPage.logout();
    //expect(page.url()).to.equal("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await loginPage.pause(2000);
  });
  

  it("TC02: Đăng nhập thất bại - Sai thông tin", async () => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await loginPage.login(data.fakeUserName, data.fakePassword);
    const error = await loginPage.getErrorMessage();
    expect(error).to.include("Invalid credentials");
    await loginPage.pause(2000);
  });
});
