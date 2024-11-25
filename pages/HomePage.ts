import { Page, Locator } from '@playwright/test';
import { Sidebar } from './Sidebar';

export class HomePage {
    readonly page: Page;
    readonly sidebar: Sidebar;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = new Sidebar(page);
    }

    // Locators
    get homePageLogo(): Locator {
        return this.page.locator('.app-logo');
    }

    get searchInput(): Locator {
        return this.page.locator('input[name="q"]');
    }

    get searchButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    get sortMenuSelect(): Locator {
        return this.page.locator('select[data-test="product-sort-container"]');
    }

    get itemPriceLabel(): Locator {
        return this.page.locator('div[data-test="inventory-item-price"]');
    }

    get itemNameLabel(): Locator {
        return this.page.locator('div[data-test="inventory-item-name"]');
    }

    get carButton(): Locator {
        return this.page.locator('#shopping_cart_container');
    }

    get itemContainer(): Locator {
        return this.page.locator('div[data-test="inventory-item"]');
    }

    // Actions
    async navigate() {
        await this.page.goto('/app.html');
    }

    async searchFor(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async selectSorting(value: string): Promise<this> {
        const options = await this.sortMenuSelect.evaluate((select) => {
            const selectElement = select as HTMLSelectElement;
            return Array.from(selectElement.options).map(option => option.value);
        });

        if (!options.includes(value)) {
            throw new Error(`Option "${value}" does not exist. Available options: ${options.join(', ')}`);
        }

        await this.sortMenuSelect.selectOption(value);
        return this;
    }
}
