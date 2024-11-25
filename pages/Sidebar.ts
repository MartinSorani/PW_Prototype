import { Page, Locator } from '@playwright/test';

export class Sidebar {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    get sideMenuButton(): Locator {
        return this.page.locator('#react-burger-menu-btn');
    }

    get closeSideMenuButton(): Locator {
        return this.page.locator('#react-burger-cross-btn');
    }

    get allItemsButton(): Locator {
        return this.page.locator('#inventory_sidebar_link');
    }

    get aboutButton(): Locator {
        return this.page.locator('#about_sidebar_link');
    }

    get logoutButton(): Locator {
        return this.page.locator('#logout_sidebar_link');
    }

    get resetButton(): Locator {
        return this.page.locator('#reset_sidebar_link');
    }

    // Actions

    async openMenu() {
        await this.sideMenuButton.click();
    }

    async clickAllItems() {
        await this.openMenu();
        await this.allItemsButton.click();
    }

    async clickAboutButton() {
        await this.openMenu();
        await this.aboutButton.click();
    }

    async logout() {
        await this.openMenu();
        await this.logoutButton.click();
    }

    async resetAppState() {
        await this.openMenu();
        await this.resetButton.click();
    }
}