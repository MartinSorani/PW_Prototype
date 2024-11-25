import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test('Verify successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.enterCredentials('standard_user', 'secret_sauce');
  await homePage.verifyOnPage();
});

test('Verify adding multiple items to cart', async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.addItemToCart('Sauce Labs Backpack');
    await homePage.addItemToCart('Sauce Labs Bolt T-Shirt');
    await homePage.clickCartButton();
    await cartPage.verifyOnPage();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
});

test('Verify cart TOTAL calculation', async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await homePage.addItemToCart('Sauce Labs Backpack');
    await homePage.addItemToCart('Sauce Labs Bolt T-Shirt');
    await homePage.clickCartButton();
    await cartPage.verifyOnPage();
    await cartPage.clickCheckout();
    await checkoutPage.enterShippingDetails('Martin', 'Sorani', '5000');
    await checkoutPage.clickContinueButton();
    const totalText = await checkoutOverviewPage.getTotalText();
    expect(totalText).toContain('$43.18');
})
