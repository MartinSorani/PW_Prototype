import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    get totalLabel(): Locator {
        return this.page.locator('div[data-test="total-label"]');
    }

    // Actions
    async getTotalText(): Promise<string> {
        return this.totalLabel.innerText();
    }
}