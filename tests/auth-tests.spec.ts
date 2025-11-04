import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker/locale/ar";
import * as dotenv from 'dotenv';
dotenv.config();

const appUrl = process.env.APP_URL || "http://localhost:3000";


test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
    await page.waitForLoadState("networkidle");
});

test('Login button is disabled if one field is empty', async ({ page }) => {
    const loginField = page.getByTestId("username-input");
    const signInButton = page.getByTestId("signIn-button");

    await expect(signInButton).toBeEnabled();
    await loginField.fill(faker.internet.username());
    await expect(signInButton).toBeDisabled();
});

test('Auth error modal is visible if credentials are wrong', async ({ page }) => {
    const loginField = page.getByTestId("username-input");
    const passwordField = page.getByTestId("password-input");
    const signInButton = page.getByTestId("signIn-button");
    const authErrorPopup = page.getByTestId("authorizationError-popup");

    await loginField.fill(faker.internet.username());
    await passwordField.fill(faker.internet.password());
    await signInButton.click();

    await expect(authErrorPopup).toBeVisible();
});