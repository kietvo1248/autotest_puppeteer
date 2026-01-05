const BasePage = require("../BasePage");
class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.userNameBox = "input[placeholder='Name']";
    this.emailBox = "input[data-qa='signup-email']";
    this.signupButton = "button[data-qa='signup-button']";
    this.genderRadio = "#id_gender1";
    this.passwordBox = "#password";
    this.daySelect = "#days";
    this.monthSelect = "#months";
    this.yearSelect = "#years";
    this.newsletterCheckbox = "#newsletter";
    this.specialOffersCheckbox = "#optin";
    this.firstNameBox = "#first_name";
    this.lastNameBox = "#last_name";
    this.companyBox = "#company";
    this.addressBox = "#address1";
    this.address2Box = "#address2";
    this.countrySelect = "#country";
    this.stateBox = "#state";
    this.cityBox = "#city";
    this.zipcodeBox = "#zipcode";
    this.mobileNumberBox = "#mobile_number";
    this.createAccountButton = "button[data-qa='create-account']";
    //delete
    this.deleteAccountButton = "a[href='/delete_account']";
    //message
    this.message = "h2[class='title text-center'] b";
    this.continueButton = ".btn.btn-primary";
    //welcome message
    this.welcomeMessage = "li:nth-child(10) a:nth-child(1)";
    //login
    this.loginEmailBox = "input[data-qa='login-email']";
    this.loginPasswordBox = "input[placeholder='Password']";
    this.loginButton = "button[data-qa='login-button']";
  }

  async register(userData) {
    await this.waitAndClick(this.userNameBox);
    await this.waitAndType(this.userNameBox, userData.name);
    await this.waitAndType(this.emailBox, userData.email);
    await this.waitAndClick(this.signupButton);
    await this.waitAndClick(this.genderRadio);
    await this.waitAndType(this.passwordBox, userData.password);
    await this.waitAndSelect(this.daySelect, userData.day);
    await this.waitAndSelect(this.monthSelect, userData.month);
    await this.waitAndSelect(this.yearSelect, userData.year);
    //await this.waitAndClick(this.newsletterCheckbox);
    //await this.waitAndClick(this.specialOffersCheckbox);
    await this.waitAndType(this.firstNameBox, userData.firstName);
    await this.waitAndType(this.lastNameBox, userData.lastName);
    await this.waitAndType(this.companyBox, userData.company);
    await this.waitAndType(this.addressBox, userData.address1);
    await this.waitAndType(this.address2Box, userData.address2);
    await this.waitAndSelect(this.countrySelect, userData.country);
    await this.waitAndType(this.stateBox, userData.state);
    await this.waitAndType(this.cityBox, userData.city);
    await this.waitAndType(this.zipcodeBox, userData.zipcode);
    await this.waitAndType(this.mobileNumberBox, userData.mobileNumber);
    await this.waitAndClick(this.createAccountButton);
  }

  async deleteAccount() {
    await this.waitAndClick(this.deleteAccountButton);
  }

  async getMessage() {
    return await this.waitAndGetText(this.message);
  }

  async clickContinue() {
    await this.waitAndClick(this.continueButton);
  }
  async getWelcomeMessage() {
    return await this.waitAndGetText(this.welcomeMessage);
  }

  async login(username, password) {
    await this.waitAndType(this.loginEmailBox, username);
    await this.waitAndType(this.loginPasswordBox, password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
      this.page.click(this.loginButton)
    ]);
  }
}

module.exports = RegisterPage;

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'New User Signup!' is visible
// 6. Enter name and email address
// 7. Click 'Signup' button
// 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
// 9. Fill details: Title, Name, Email, Password, Date of birth
// 10. Select checkbox 'Sign up for our newsletter!'
// 11. Select checkbox 'Receive special offers from our partners!'
// 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
// 13. Click 'Create Account button'
// 14. Verify that 'ACCOUNT CREATED!' is visible
// 15. Click 'Continue' button
// 16. Verify that 'Logged in as username' is visible
// 17. Click 'Delete Account' button
// 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
