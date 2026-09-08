import {test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';


//1.  data-sets an array of scenarios to test
const invalidLogins = [
    { username: 'locked_out_user', password: 'secret_sauce', desc: 'Epic sadface: Sorry, this user has been locked out.' },
    { username: '', password: 'secret_sauce' , desc: 'Epic sadface: Username is required'},
    { username: 'standard_user', password: 'wrong_password', desc: 'Epic sadface: Username and password do not match any user in this service' }
];

//2. loop through the logins
test.describe('Data-driven login tests @data-driven', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    for(const { username, password, desc} of invalidLogins) {
        test(`Login test ${desc}`, async ({ page }) => {
            await loginPage.login(username, password);
            await expect(loginPage.errorMessage).toHaveText(desc);
        });
    }
})