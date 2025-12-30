const { launchBrowser } = require('../utils/browser');
const config = require('../utils/config');

(async () => {
    console.log('--- Đang kiểm tra cấu hình trình duyệt ---');
    const { browser, page } = await launchBrowser();

    try {
        await page.goto(config.baseUrl, { waitUntil: 'networkidle2' }); //không quá 2 kết nối mạng hoạt động trong ít nhất 500ms.
        console.log(`Mở trang ${config.baseUrl} thành công!`);
        
        // Giữ trình duyệt mở một lát để quan sát
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (err) {
        console.error('Lỗi khi truy cập trang web:', err);
    } finally {
        await browser.close();
        console.log('--- Kiểm tra hoàn tất, trình duyệt đã đóng ---');
    }
})();


//có 4 tùy chọn chính cho waitUntil
// load: Sự kiện window.onload kích hoạt. Đây là mặc định.

// domcontentloaded: HTML đã tải xong và cây DOM đã sẵn sàng. (nếu chỉ quan tâm đến cấu trúc HTML và muốn tốc độ test nhanh nhất có thể.)

// networkidle0: Không còn kết nối mạng nào hoạt động trong ít nhất 500ms.  (cho các trang web tĩnh hoặc ít kết nối mạng, nếu cần đảm bảo tuyệt đối trang web đã tải xong mọi thứ)

// networkidle2: không quá 2 kết nối mạng hoạt động trong ít nhất 500ms. (cho các trang web có nhiều quảng cáo, scripts theo dõi hoặc kết nối liên tục)