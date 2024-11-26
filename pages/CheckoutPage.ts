import { Page, Locator } from '@playwright/test';
import { Sidebar } from './Sidebar';
import { CartPage } from './CartPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

export class CheckoutPage {
    readonly page: Page;
    readonly sidebar: Sidebar;
    readonly expectedTitle = "Checkout";

    constructor(page: Page) {
        this.page = page;
        this.sidebar = new Sidebar(page);
    }

    // Locators
    private pageTitle(): Locator {
        return this.page.locator('span[data-test="title"]');
    }

    get firstNameInput(): Locator {
        return this.page.locator('#first-name');
    }

    get lastNameInput(): Locator {
        return this.page.locator('#last-name');
    }

    get zipCodeInput(): Locator {
        return this.page.locator('#postal-code');
    }

    get cancelButton(): Locator {
        return this.page.locator('#cancel');
    }

    get continueButton(): Locator {
        return this.page.locator('#continue');
    }

    get errorButton(): Locator {
        return this.page.locator('button[data-test="error-button"]');
    }

    get errorMessage(): Locator {
        return this.page.locator('h3[data-test="error"]');
    }    

    // Actions
    async verifyOnPage(): Promise<void> {
        if (!(await this.pageTitle().isVisible())) {
            throw new Error('Title element is not visible on the page.');
        }

        const titleText = await this.pageTitle().textContent();
        if (!titleText?.includes(this.expectedTitle)) {
            throw new Error(`Unexpected title text: "${titleText}". Expected text to include "${this.expectedTitle}".`);
        }
    }

    async enterShippingDetails(firstName: string, lastName: string, zipCode: string): Promise<this> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        return this;
    }

    async clickCancelButton(): Promise<CartPage> {
        await this.cancelButton.click();
        const cartPage = new CartPage(this.page);
        cartPage.verifyOnPage();
        return cartPage;
    }

    async verifyErrorMessage(expectedMessage: string): Promise<this> {
        const isVisible = await this.errorMessage.isVisible();
        if (!isVisible) {
            throw new Error('Error message is not visible.');
        }
    
        const actualMessage = await this.errorMessage.textContent();
        if (!actualMessage?.includes(expectedMessage)) {
            throw new Error(`Unexpected error message: "${actualMessage}". Expected: "${expectedMessage}".`);
        }

        return this;
    }

    async clickContinueButton(): Promise<CheckoutOverviewPage> {
        await this.clickContinueButton();
        return new CheckoutOverviewPage(this.page);
    }
}