import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    get userNameInput(): Locator {
        return this.page.locator('#user-name');
    }

    get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    get loginButton(): Locator {
        return this.page.locator('#login-button');
    }

    get loginLogo(): Locator {
        return this.page.locator('.login_logo');
    }

    get errorMessage(): Locator {
        return this.page.locator('h3[data-test="error"]');
    }

    get errorButton(): Locator {
        return this.page.locator('button[data-test="error-button"]');
    }

    // Actions
    async navigate() {
        await this.page.goto('/');
    }

    async enterCredentials(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async closeErrorMessage() {
        await this.errorButton.click();
    }
}
