import { test, expect } from '../fixtures/fixtures';
import { lockedOutUser } from '../testdata';

test("TC-001, Login to app", async ({ productPage }) => {
    await expect(productPage.productList).toBeVisible();
});

test.describe(() => {
    test.use({userToLogin: lockedOutUser, successfulLogin: false});
    test("TC-001-1, Locked user login", async({ page }) => {
        await expect(page.getByTestId("error")).toBeVisible();
    })
});
