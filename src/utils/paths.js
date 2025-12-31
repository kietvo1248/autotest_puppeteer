const path = require('path');
const os = require('os');

// Định nghĩa các đường dẫn mặc định dựa trên hệ điều hành
const browserPaths = {
    win32: { // Windows
        chrome: [
            'C:/Program Files/Google/Chrome/Application/chrome.exe',
            'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            path.join(os.homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe')
        ],
        edge: [
            'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
            'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
        ]
    },
    darwin: { // macOS
        chrome: [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        ],
        edge: [
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
        ]
    },
    linux: { // Linux (Ubuntu, Debian, v.v.)
        chrome: [
            '/usr/bin/google-chrome',
            '/usr/bin/chromium-browser'
        ],
        edge: [
            '/usr/bin/microsoft-edge'
        ]
    }
};

module.exports = browserPaths;