import { test, expect } from '../fixtures/fixtures';
import { product } from '../testdata'

test("TC-002, Add product to cart and check price", async ({ productPage, cartPage }) => {
    await expect(productPage.productList).toBeVisible();

    await productPage.addToCartByTitle(product.name);
    await cartPage.goToCartPage();
    const productPrice = await cartPage.getPriceByTitle(product.name);
    expect(productPrice).toEqual(product.price);
});