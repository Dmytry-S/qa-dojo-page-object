import { test, expect } from '../fixtures/fixtures';
import { user, product } from '../testdata'

test("TC-004, Go back to product page", async ({
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
    }) => {
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