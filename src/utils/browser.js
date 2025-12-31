const puppeteer = require('puppeteer-core');
const config = require('./config');
const browserPaths = require('./paths');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * tìm đường dẫn dựa trên hệ điều hành và loại trình duyệt
 */
function getExecutablePath(browserType) {
    const platform = process.platform; // Trả về 'win32', 'darwin', hoặc 'linux'
    
    // Lấy danh sách đường dẫn tương ứng với OS hiện tại
    const platformPaths = browserPaths[platform];
    
    if (!platformPaths) {
        throw new Error(`Hệ điều hành ${platform} hiện chưa được hỗ trợ.`);
    }

    // Lấy mảng các đường dẫn của trình duyệt cần tìm
    const paths = platformPaths[browserType] || platformPaths.chrome;

    // Duyệt qua mảng để tìm file thực thi tồn tại đầu tiên
    for (const p of paths) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

async function launchBrowser() {
    const browserType = config.browserType;
    const executablePath = getExecutablePath(browserType);

    if (!executablePath) {
        throw new Error(`Không tìm thấy trình duyệt ${browserType} trên hệ điều hành ${process.platform}!`);
    }

    // Tạo thư mục profile tạm thời
    const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `puppeteer_profile_${browserType}_`));

    console.log(`--- [Hệ thống: ${process.platform.toUpperCase()}] Khởi tạo ${browserType.toUpperCase()} ---`);
    console.log(`Đường dẫn thực thi: ${executablePath}`);

    const browser = await puppeteer.launch({
        executablePath: executablePath,
        headless: config.headless,
        userDataDir: tempUserDataDir,
        args: [
            '--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    // Dọn Rác
    browser.on('disconnected', () => {
        // Sử dụng setTimeout để đợi Windows giải phóng file lock
        setTimeout(() => {
            let retryCount = 0;
            const maxRetries = 3;

            const attemptDeletion = () => {
                try {
                    if (fs.existsSync(tempUserDataDir)) {
                        fs.rmSync(tempUserDataDir, { recursive: true, force: true });
                        console.log(`--- [Hệ thống] Đã xóa sạch thư mục tạm: ${tempUserDataDir} ---`);
                    }
                } catch (err) {
                    if (err.code === 'EBUSY' && retryCount < maxRetries) {
                        retryCount++;
                        console.warn(`[Cảnh báo] File đang bận, thử lại lần ${retryCount}...`);
                        setTimeout(attemptDeletion, 1000); // Thử lại sau 1 giây
                    } else {
                        console.error(`[Lỗi] Không thể xóa thư mục tạm sau ${maxRetries} lần thử: ${err.message}`);
                    }
                }
            };

            attemptDeletion();
        }, 2000);
    });

    const page = await browser.newPage();

    const { width, height } = await page.evaluate(() => ({
        width: window.screen.width,
        height: window.screen.height
    }));
    await page.setViewport({ width, height });

    return { browser, page };
}

module.exports = { launchBrowser };

//con bọ đã gặp EBUSY: resource busy or locked khi xóa thư mục tạm trên Windows
//khi trình duyệt vừa đóng, hệ điều hành (OS) hoặc các tiến trình chạy ngầm của trình duyệt (như Edge hay Chrome) 
// vẫn còn giữ "handle" (quyền truy cập) vào các file log hoặc database trong thư mục Profile --> dẫn đến lỗi không thể xóa thư mục tạm ngay lập tức.
//Giải pháp tạm thời là thêm cơ chế thử lại với độ trễ ngắn giữa các lần thử xóa thư mục tạm.