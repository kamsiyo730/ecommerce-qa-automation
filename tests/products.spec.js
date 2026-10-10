import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginpage.js';
import { ProductPage } from '../page/productpage.js';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Verify product page title', async ({ page }) => {
    const productPage = new ProductPage(page);
    await expect(productPage.pageTitle).toHaveText('Products');
});
test('Verify product count', async ({ page }) => {
    const productPage = new ProductPage(page);
   await expect(productPage.productitem).toHaveCount(6);
});
test('Add product to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await expect(productPage.cartbadge).toHaveText('1');
});