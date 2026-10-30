import { BasePage } from './BasePage';
import { Page } from '@playwright/test'

export class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async loginToApp(userName: string, password: string) {
        await this.page.getByTestId("username").fill(userName);
        await this.page.getByTestId("password").fill(password);
        await this.page.getByTestId("login-button").click();
    }
};
