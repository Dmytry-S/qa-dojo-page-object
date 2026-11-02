import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test'

export class ProductPage extends BasePage{
    productList: Locator;
    itemProduct: BasePage;

    constructor(page: Page) {
        super(page);
        this.productList = page.getByTestId("inventory-list");
        this.itemProduct = new BasePage(page);
    }

    async addToCartByTitle(title: string) {
        const item = await this.itemProduct.findProductByTitle(title);
        await item.getByRole("button", { name: "Add to cart"}).click();
    }

    async removeFromCartByTitle(title: string) {
        const item = await this.itemProduct.findProductByTitle(title);
        await item.getByRole("button", { name: "Remove"}).click();

    }

    async getPriceByTitle(title: string) {
        const item = await this.itemProduct.findProductByTitle(title);
        return await item.getByTestId("inventory-item-price").innerText();
    }
};
