import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { user } from '../testdata'

type MyFixtures = {
    login: void;
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    userToLogin: { login: string, password: string};
    logOut: LoginPage;
    successfulLogin: boolean;
}

const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        page.goto("/");

        await use(loginPage);
    },

    login: [async ({ loginPage, userToLogin }, use) => {
        await loginPage.loginToApp(userToLogin);

        await use();
    },
    { auto: true},
    ],

    userToLogin: user.toLogin,

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);

        await use(productPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },

    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);

        await use(checkoutStepOnePage);
    },

    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

        await use(checkoutStepTwoPage);
    },

    successfulLogin: true,

    logOut: [ async ({page, successfulLogin}, use) => {
        const logOut = new LoginPage(page);

        await use(logOut);

        if (successfulLogin) {
            await logOut.cleanAndLogOut();
        }
    },
    { auto: true},
    ]
});

export { test, expect};
