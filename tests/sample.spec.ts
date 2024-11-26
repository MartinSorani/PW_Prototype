import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';

test('Verify successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    const homePage = await loginPage.enterCredentials('standard_user', 'secret_sauce');
    await homePage.verifyOnPage();
});