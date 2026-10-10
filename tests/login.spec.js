import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginpage.js';



test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
});

test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('invalid_user', 'invalid_password');

    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('', '');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});
