const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
    }

    async addItem(itemName) {
        const selector = `#add-to-cart-${itemName}`;
        await this.waitAndClick(selector);
    }

    async removeItem(itemName) {
        const selector = `#remove-${itemName}`;
        await this.waitAndClick(selector);
    }

    async goToCart() {
        await this.waitAndClick(this.cartLink);
    }
}
module.exports = InventoryPage;