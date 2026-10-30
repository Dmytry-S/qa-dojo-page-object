import { BasePage } from './BasePage';
import { Page } from '@playwright/test'

export class CheckoutStepOnePage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async fillFirstName(firstName: string) {
        await this.page.getByTestId("firstName").fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.page.getByTestId("lastName").fill(lastName);
    }

    async fillZipCode(zipCode: string) {
        await this.page.getByTestId("postalCode").fill(zipCode);
    }

    async continue() {
        await this.page.getByTestId("continue").click();
    }
};