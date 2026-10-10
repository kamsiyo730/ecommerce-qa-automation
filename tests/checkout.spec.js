import{test, expect} from '@playwright/test';
import { LoginPage } from '../page/loginpage.js';
import { ProductPage } from '../page/productpage.js';
import { CheckoutPage } from '../page/checkoutpage.js';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const productPage = new ProductPage(page);
    await productPage.addproducttocart('Sauce Labs Backpack');
    await productPage.openCart();
    await page.locator('[data-test="checkout"]').click();
});
test('checkout should display the customer information form', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    
});




test('verify checkout reject empty customer information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.Continuecheckout();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
});
test('checkout should complete a purchase successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.Continuecheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutPage.pageTitle).toHaveText('Thank you for your order!');
});

test('checkout should reject missing first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation('', 'Doe', '12345');
    await checkoutPage.Continuecheckout();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
});

test('checkout should reject missing last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation('John', '', '12345');
    await checkoutPage.Continuecheckout();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
});

test('checkout should reject missing postal code', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '');
    await checkoutPage.Continuecheckout();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
});