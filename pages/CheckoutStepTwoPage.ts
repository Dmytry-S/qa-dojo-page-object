import { BasePage } from './BasePage';
import { Page } from '@playwright/test'

export class CheckoutStepTwoPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async finish() {
        await this.page.getByTestId("finish").click();
    }

    async getTotalPrice() {
        return await this.page.getByTestId("total-label").innerText();
    }

    async cancel() {
    await this.page.getByTestId("cancel").click();
    }
};
