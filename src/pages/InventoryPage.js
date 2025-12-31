const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
    }

    async addItem(productName) {
        const selector = `#add-to-cart-${productName}`; 
        await this.waitAndClick(selector);
    }

    async removeItem(productName) {
        const selector = `#remove-${productName}`;
        await this.waitAndClick(selector);
    }

    async goToCart() {
        await this.waitAndClick(this.cartLink);
    }
}
module.exports = InventoryPage;