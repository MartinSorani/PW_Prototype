import { Page, Locator } from '@playwright/test';
import { Sidebar } from './Sidebar';
import { CheckoutPage } from './CheckoutPage';

export class CartPage {
    readonly page: Page;
    readonly sidebar: Sidebar;
    readonly expectedTitle = "Your Cart";

    constructor(page: Page) {
        this.page = page;
        this.sidebar = new Sidebar(page);
    }

    // Locators
    get continueShoppingButton(): Locator {
        return this.page.locator('#continue-shopping');
    }

    get checkoutButton(): Locator {
        return this.page.locator('#checkout');
    }

    get itemsBox(): Locator {
        return this.page.locator('div[data-test="inventory-item"]');
    }

    get itemName(): Locator {
        return this.page.locator('.inventory_item_name');
    }

    get itemPrice(): Locator {
        return this.page.locator('.inventory_item_price');
    }

    private itemRemoveButton(itemName: string): Locator {
        return this.page.locator(
            `.cart_item:has-text("${itemName}") .btn.btn_secondary.btn_small.cart_button`
        );
    }

    private pageTitle(): Locator {
        return this.page.locator('span[data-test="title"]');
    }

    // Actions
    async navigate() {
        await this.page.goto('/cart.html');
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

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickCheckout(): Promise<CheckoutPage> {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }

    async removeItem(itemName: string): Promise<this> {
        const removeButton = this.itemRemoveButton(itemName);
        if (!(await removeButton.isVisible())) {
            throw new Error('Item "${itemName}" not found in the cart.');
        }
        await removeButton.click();
        return this;
    }
}