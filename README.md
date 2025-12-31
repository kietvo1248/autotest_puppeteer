# Puppeteer Automated Testing Framework

A professional, modular automated testing framework built with **Puppeteer**, **Mocha**, and **Chai**. This project implements the **Page Object Model (POM)** pattern to ensure scalability, maintainability, and clean test code.

## 🚀 Features

- **Page Object Model (POM):** Decouples test logic from UI selectors for easier maintenance.
- **Mochawesome Reporting:** Generates beautiful, interactive HTML reports with execution summaries and error details.
- **Cross-Browser Support:** Easily switch between Chrome and Microsoft Edge via configuration.
- **Cross-Platform Compatibility:** Automatically detects browser paths for Windows, macOS, and Linux.
- **Robust Profile Management:** Uses temporary blank profiles for each session to avoid conflicts and ensure a clean testing environment.
- **Auto-Cleanup:** Automatically removes temporary user data directories after tests to save disk space, including retry logic for Windows file-locking issues.

## 🛠 Tech Stack

- **Engine:** [Puppeteer Core](https://pptr.dev/)
- **Test Runner:** [Mocha](https://mochajs.org/)
- **Assertion Library:** [Chai](https://www.chaijs.com/)
- **Reporting:** [Mochawesome](https://github.com/adamgruber/mochawesome)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [npm](https://www.npmjs.com/)

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kietvo1248/autotest_puppeteer.git](https://github.com/kietvo1248/autotest_puppeteer.git)
   cd autotest_puppeteer

    ```

2. Install dependencies:
    ```
    npm install

    ```

## Project Structure

    src/pages/: Page Object classes (selectors and actions).

    src/tests/: Test scenarios.

    src/utils/: Helper functions for browser initialization and config.

    Data/: Test data management.

    reports/: Auto-generated HTML reports.

## Usage

1. Update `data` in the test script with appropriate values.
2. Run the test file script

## Logging

Results are logged to a file. Modify the log file path in the script.

### Example Logs

- **Error:**

    ```
    Test Case 2: Login failed
    started at ____, ended at____
    error:____
    ```

- **Success:**

    ```
    Test Case 2: Login successful
    started at ____, ended at____
    error:____
    ```

## Contact me : kietvo.011203@gmail.com

#### &#169; 2024 KietVo 
