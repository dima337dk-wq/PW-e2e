import {expect, Locator, test} from "@playwright/test";
const path = require("path");

let usernameField: Locator;
let emailField: Locator;
let placeButton: Locator;
let popupModal: Locator;

test.beforeEach(async ({ page }) => {
    usernameField = page.locator("#username");
    emailField = page.locator("#email");
    placeButton = page.locator("#submit-order");
    popupModal = page.locator("[id=popup-message]");

    const filePath = `file://${path.resolve("src/order-flow.html")}`;
    await page.goto(filePath);
});

test('Popup is visible', async ({ page }) => {
    await expect(placeButton).toBeDisabled();
    await usernameField.fill("test");
    await emailField.fill("test@test.test");
    await expect(placeButton).toBeEnabled();
    await placeButton.click();

    await expect(popupModal).toBeVisible();
    // альтернатива
    expect(await popupModal.getAttribute("style")).toContain("display: block");
});

test('Button disabled initially', async ({ page }) => {
    await expect(placeButton).toBeDisabled();
});

test('Button enabled after filling correct data', async ({ page }) => {
    await usernameField.fill("test");
    await emailField.fill("test@test.ru");

    await expect(placeButton).toBeEnabled();
});
