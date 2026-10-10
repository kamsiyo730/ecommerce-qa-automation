export class ProductPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.productitem = page.locator('.inventory_item');
        this.cartbadge = page.locator('.shopping_cart_badge');
        this.cartlink = page.locator('.shopping_cart_link');
        
    }
    async getpagecount() {
        return await this.productitem.count();
    }
    async addproducttocart(productname) {
        const product = this.page.locator(`.inventory_item:has-text("${productname}")`);
        const addToCartButton = product.locator('button:has-text("Add to cart")');
        await addToCartButton.click();
    }
    async openCart() {
        await this.cartlink.click();
    }
    async removeproductfromcart(productname) {
        const product = this.page.locator(`.inventory_item:has-text("${productname}")`);
        const removeButton = product.locator('button:has-text("Remove")');
        await removeButton.click();
    }
    async getcartcount() {
        if (await this.cartbadge.count() === 0) {
             return '0';
        }
       return await this.cartbadge.textContent();
    }

}