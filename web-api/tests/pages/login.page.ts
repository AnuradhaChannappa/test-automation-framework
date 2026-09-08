import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // declare the readonly properties for the page nd locators
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    //constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    //method to navigate to the login page
    async goto() {
        await this.page.goto('/');
    }

    //method to perform login actions
    async login(username: string, password:string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //method to get the error message text
    async getErrorMessage(): Promise<string>{
        return await this.errorMessage.textContent() || '';    
    }

}