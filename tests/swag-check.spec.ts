import { test, expect } from '@playwright/test';
import { user, product } from './testdata'
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';


let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;


test.beforeEach(async ({ page }) => {
    page.goto("/");
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
});

test("TC-001, Login to app", async ({ page }) => {
    await loginPage.loginToApp(user.login, user.password);
    await expect(productPage.productList).toBeVisible();
});

test("TC-002, Add product to cart and check price", async ({ page }) => {
    await loginPage.loginToApp(user.login, user.password);
    await expect(productPage.productList).toBeVisible();

    await productPage.addToCartByTitle(product.name);
    await cartPage.goToCartPage();
    const productPrice = await cartPage.getPriceByTitle(product.name);
    expect(productPrice).toEqual(product.price);
});

test("TC-003, Order product and check result", async ({ page }) => {
    await loginPage.loginToApp(user.login, user.password);
    await expect(productPage.productList).toBeVisible();

    await productPage.addToCartByTitle(product.name);
    await cartPage.goToCartPage();
    await cartPage.checkout();

    await checkoutStepOnePage.fillFirstName(user.firstName);
    await checkoutStepOnePage.fillLastName(user.lastName);
    await checkoutStepOnePage.fillZipCode(user.zipCode);
    await checkoutStepOnePage.continue();

    await checkoutStepTwoPage.finish();

    expect(page.getByTestId("complete-header")).toBeVisible();
});

test("TC-004, Go back to product page", async ({ page }) => {
    await loginPage.loginToApp(user.login, user.password);
    await expect(productPage.productList).toBeVisible();

    await productPage.addToCartByTitle(product.name);
    await cartPage.goToCartPage();
    await cartPage.checkout();

    await checkoutStepOnePage.fillFirstName(user.firstName);
    await checkoutStepOnePage.fillLastName(user.lastName);
    await checkoutStepOnePage.fillZipCode(user.zipCode);
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.cancel();
    await expect(productPage.productList).toBeVisible();
});
