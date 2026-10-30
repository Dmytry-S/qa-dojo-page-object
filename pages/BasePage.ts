import { Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly productItem: Locator;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItem = page.getByTestId("inventory-item");
        this.productName = page.getByTestId("inventory-item-name");
    }

    async findProductByTitle(title: string) {
        return this.productItem.filter({ has: this.productName.getByText(title, { exact: true}),});
    }
};