import { Page, Locator } from '@playwright/test';
import { Sidebar } from './Sidebar';

export class HomePage {
    readonly page: Page;
    readonly sidebar: Sidebar;
    readonly expectedTitle = "Products";

    constructor(page: Page) {
        this.page = page;
        this.sidebar = new Sidebar(page);
    }

    // Locators
    private pageTitle(): Locator {
        return this.page.locator('span[data-test="title"]');
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

    private itemButton(itemName: string, buttonType: 'add' | 'remove'): Locator {
        const buttonClass =
            buttonType === 'add'
                ? '.btn.btn_primary.btn_small.btn_inventory'
                : '.btn.btn_secondary.btn_small.btn_inventory';

        return this.page.locator(
            `div[data-test="inventory-item"]:has-text("${itemName}") ${buttonClass}`
        );
    }


    // Actions
    async navigate() {
        await this.page.goto('/app.html');
    }

    async verifyOnPage(): Promise<void> {
        if (!(await this.pageTitle().isVisible())) {
            throw new Error('Title element is not visible on the page.');
        }

        const titleText = await this.pageTitle().textContent();
        if (!titleText?.includes(this.expectedTitle)) {
            throw new Error(`Unexpected title text: "${titleText}". Expected text to include "${this.expectedTitle}".`);
        }
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

    async clickItemButton(itemName: string, buttonType: 'add' | 'remove'): Promise<this> {
        const button = this.itemButton(itemName, buttonType);

        if (!(await button.isVisible())) {
            throw new Error(`Item "${itemName}" not found or button is not visible.`);
        }

        await button.click();
        return this;
    }

    async addItemToCart(itemName: string): Promise<this> {
        return this.clickItemButton(itemName, 'add');
    }

    async removeItemFromCart(itemName: string): Promise<this> {
        return this.clickItemButton(itemName, 'remove');
    }
}