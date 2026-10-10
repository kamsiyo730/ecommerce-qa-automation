import{test, expect} from '@playwright/test';
import { LoginPage } from '../page/loginpage.js';
import { ProductPage } from '../page/productpage.js';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Add and remove product from cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await expect(productPage.cartbadge).toHaveText('1');
    await productPage.removeproductfromcart('Sauce Labs Backpack');
    await expect(productPage.cartbadge).toHaveCount(0);
});
test('Open cart and verify product count', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await productPage.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);
});

test('Verify cart count after adding multiple products', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await productPage.addproducttocart('Sauce Labs Bike Light');
    await expect(productPage.cartbadge).toHaveText('2');
});
test('Verify cart count after removing a product', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await productPage.addproducttocart('Sauce Labs Bike Light');
    await productPage.removeproductfromcart('Sauce Labs Backpack');
    await expect(productPage.cartbadge).toHaveText('1');
});
