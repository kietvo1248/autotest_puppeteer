const { expect } = require("chai");
const { launchBrowser } = require("../utils/browser");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const CheckoutPage = require("../pages/CheckOutPage");
const data = require("../../Data/data_saucedemo");

describe("Quy trình mua hàng Saucedemo (E2E)", function () {
  this.timeout(60000);
  let browser, page, loginPage, inventoryPage, checkoutPage;

  before(async () => {
    ({ browser, page } = await launchBrowser());
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  // --- TEST LOGIN ---
  it("TC01: Đăng nhập thành công", async () => {
    await loginPage.navigate("https://www.saucedemo.com/");
    await loginPage.login(data.userName, data.password);
    expect(page.url()).to.include("/inventory.html");
  });

  it("TC02: Đăng nhập thất bại - Sai thông tin", async () => {
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(data.fakeUserName, data.fakePassword);
    const error = await loginPage.getErrorMessage();
    expect(error).to.include("Username and password do not match");
  });

  it("TC03: Đăng nhập thất bại - Thiếu password", async () => {
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(data.userName, data.emptyPassword);
    const error = await loginPage.getErrorMessage();
    expect(error).to.include("Password is required");
  });

  // --- TEST SHOPPING & CHECKOUT ---
  describe("Quy trình mua hàng Saucedemo (Trình diễn step-by-step)", function () {
    this.timeout(120000); // Tăng timeout vì có các khoảng nghỉ dài
    let browser, page, loginPage, inventoryPage, checkoutPage;

    before(async () => {
      ({ browser, page } = await launchBrowser());
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      checkoutPage = new CheckoutPage(page);
    });

    after(async () => {
      if (browser) await browser.close();
    });

    it("TC04: Quy trình mua hàng mô phỏng người dùng thật", async () => {
      // 1. Vào trang chủ
      await loginPage.navigate("https://www.saucedemo.com/");
      await loginPage.pause(3000); // Đợi 3s để xem trang login

      // 2. Đăng nhập
      await loginPage.login(data.userName, data.password);
      console.log("--- Đã đăng nhập thành công ---");
      await loginPage.pause(3000); // Nghỉ 3s sau khi vào trang sản phẩm

      // 3. Chọn hàng & Xóa hàng
      await inventoryPage.addItem("sauce-labs-bolt-t-shirt");
      await inventoryPage.pause(2000); // Nghỉ 2s sau khi add
      await inventoryPage.removeItem("sauce-labs-bolt-t-shirt");
      console.log("--- Đã thử xóa hàng thành công ---");
      await inventoryPage.pause(2000);

      await inventoryPage.addItem("sauce-labs-bike-light");
      await inventoryPage.addItem("sauce-labs-backpack");
      await inventoryPage.pause(3000); // Nghỉ để xem giỏ hàng cập nhật số lượng

      // 4. Vào giỏ hàng
      await inventoryPage.goToCart();
      console.log("--- Đang xem giỏ hàng ---");
      await inventoryPage.pause(4000); // Nghỉ 4s ở trang Cart

      // 5. Tiến hành Checkout
      await page.click("#checkout");
      console.log("--- Bắt đầu điền thông tin thanh toán ---");
      await inventoryPage.pause(3000);

      // 6. Điền form thông tin
      await checkoutPage.fillInfo(
        data.firstName,
        data.lastName,
        data.postalCode
      );
      console.log("--- Đã điền xong thông tin bước 1 ---");
      await checkoutPage.pause(4000); // Nghỉ ở trang Overview để kiểm tra lại giá tiền

      // 7. Hoàn tất đặt hàng
      await checkoutPage.clickFinish();
      console.log("--- Hoàn tất đơn hàng thành công! ---");
      await checkoutPage.pause(4000); // Nghỉ ở trang Complete để xem thông báo thành công
    });
  });
});
