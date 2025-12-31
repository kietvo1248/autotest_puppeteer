# Automated Testing System User Guide

This project is a professional automated testing framework designed to help you perform End-to-End (E2E) testing scenarios on browsers efficiently and with easy scalability.

---

## I. Project Directory Structure

The system is organized according to the **Page Object Model (POM)** to separate UI handling logic from test scenarios:

- **src/pages/**: Contains files defining website components (selectors) and actions (click, type, navigate).
- **src/tests/**: Contains actual test scenarios using the Mocha framework.
- **src/utils/**: Contains support tools such as automatic browser path discovery and operating system configuration management.
- **Data/**: Contains input data for tests (accounts, passwords, personal information).

---

## II. Installation and Configuration

### 1. Environment Setup

- **Requirement**: Your computer must have **Node.js** installed.
- Open the Terminal in the project directory and run the command:

  ```bash
  npm install
  ```

  This will install Puppeteer, Mocha, Chai, and other related libraries.

### 2. Environment Variables Configuration (.env)

You need to create a `.env` file in the root directory to set specific configurations without modifying the source code:

- `BROWSER_TYPE`: Select `chrome` or `edge` to run the tests.
- `HEADLESS`: Set to `false` if you want to see the browser running, or `true` to run it in the background.
- `BASE_URL`: The main website address you want to test.

---

## III. Testing Execution Guide

### 1. Verify Browser Configuration

Before running official tests, execute the following command to ensure the system correctly finds the browser and opens the website:

```bash
npm run verify
```

This command executes the `verify_browser.js` file to check the browser's startup capability.

### 2. Run Entire Test Suite

To run all test scenarios (e.g., the full shopping process on Saucedemo) and export the reports:

```bash
npm test
```

The system will automatically execute all `.test.js` files located in the `src/tests/` directory.

---

## IV. Viewing Test Results (Mochawesome Report)

After the `npm test` execution finishes, a directory named `reports/` will be created:

1. Access the `reports/` folder.
2. Open the `TestReport.html` file using any browser (Chrome, Edge, Firefox).

The report displays information visually:

- **Passed cases (Pass)**: Displayed in green.
- **Failed cases (Fail)**: Displayed in red with specific error details.
- **Execution time**: Recorded for each individual step.

---

## V. Important Notes

- **EBUSY Error on Windows**: When closing the browser, Windows sometimes locks log files, which can cause errors when the system tries to delete temporary folders. This framework integrates an automatic retry mechanism (Retry logic) that waits 2 seconds to completely resolve this issue.

- **Clean Environment**: For every test run, the system creates a completely new browser profile and automatically deletes it afterward. This ensures that tests are not affected by old data like cookies or cache.

- **Scalability**: To test a new website, simply create a new Page file in `src/pages/` and write the scenarios in `src/tests/`. You do not need to reconfigure the browser initialization logic.