import { BasePage } from './BasePage';
import { Page } from '@playwright/test'

export class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async loginToApp(userToLogin: { login: string, password: string}) {
        await this.page.getByTestId("username").fill(userToLogin.login);
        await this.page.getByTestId("password").fill(userToLogin.password);
        await this.page.getByTestId("login-button").click();
    }

    async cleanAndLogOut() {
        await this.page.getByRole('button', { name: 'Open menu'}).click();
        await this.page.getByTestId("reset-sidebar-link").click();
        await this.page.getByTestId("logout-sidebar-link").click();
    }
};
