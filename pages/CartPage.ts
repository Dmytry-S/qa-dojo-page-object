import { BasePage } from './BasePage';
import { Page } from '@playwright/test'

export class CartPage extends BasePage{
    itemProduct: BasePage;

    constructor(page: Page) {
        super(page);
        this.itemProduct = new BasePage(page);
    }

    async removeFromCartByTitle(title: string) {
        const item = await this.itemProduct.findProductByTitle(title);
        await item.getByRole("button", { name: "Remove"}).click();
    }

    async getPriceByTitle(title: string) {
        const item = await this.itemProduct.findProductByTitle(title);
        return await item.getByTestId("inventory-item-price").innerText();
    }

    async checkout() {
        await this.page.getByTestId("checkout").click();
    }

    async continueShopping() {
        await this.page.getByTestId("continue-shopping").click();
    }

    async goToCartPage() {
        await this.page.getByTestId("shopping-cart-link").click();
    }
};
