import { Page, test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

export class BaseTest {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
  }
}

// Extend Playwright's base test to include the BaseTest
const test = baseTest.extend<{ base: BaseTest }>({
  base: async ({ page }, use) => {
    await use(new BaseTest(page));
  },
});

export { test };
export const expect = test.expect;
