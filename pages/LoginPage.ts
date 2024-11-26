import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

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
    async navigate(): Promise<this> {
        this.page.goto('/');
        return this;
    }

    async enterCredentials(username: string, password: string): Promise<HomePage> {
        this.userNameInput.fill(username);
        this.passwordInput.fill(password);
        this.loginButton.click();
        return new HomePage(this.page);
    }

    async closeErrorMessage(): Promise<this> {
        await this.errorButton.click();
        return this;
    }
}
