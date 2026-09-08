import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { ProductsPage } from './pages/products.page';



test.describe('Valid login falls on the products page', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.goto();
    });

    test('Login test', async ({page}) => {
        await loginPage.login(`${process.env.WEB_USER}`, `${process.env.WEB_PASSWORD}`);
        await expect(page).toHaveURL(/inventory/);
        await expect(productsPage.title).toHaveText('Products');
    });

    test('click sort products dropdown and select option low to high', async ({page}) => {
        await loginPage.login(`${process.env.WEB_USER}`, `${process.env.WEB_PASSWORD}` );
        await productsPage.productsDropdown.selectOption('lohi');
        const prices = await productsPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('Login negative test @negative', async () => {
        await loginPage.login(`${process.env.WEB_USER}`, 'wrong_password');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
})