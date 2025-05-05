import { test, expect } from "../support/fixtures.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("should show the signup button on any page except the login page", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Aanmelden" })).toBeVisible();
  await page.goto("/notifications");
  await expect(page.getByRole("button", { name: "Aanmelden" })).toBeVisible();
  await page.goto("/login");
  await expect(page.getByRole("button", { name: "Aanmelden" })).toBeHidden();
});

test("should direct the user to the login page by clicking the signup button", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Aanmelden" }).click();
  await expect(page).toHaveURL("/nl/login");
  await page.goto("/notifications");
  await page.getByRole("button", { name: "Aanmelden" }).click();
  await expect(page).toHaveURL("/nl/login");
});

test("should show the login page", async ({ page }) => {
  await expect(page.getByText("Ik heb al een account")).toBeVisible();
  await expect(
    page.getByText("Ik wil een nieuw account aanmaken"),
  ).toBeVisible();
  await expect(page.getByText("Uitloggen")).toBeHidden();
});

test("should be able to register a new account", async ({ page }) => {
  await page
    .getByRole("button", { name: "Ik wil een nieuw account aanmaken" })
    .click();
  await page.getByLabel("Optionele naam").fill("E2E Test User");
  await page.getByRole("button", { name: "Registreren" }).click();
  await expect(page.getByText("Account aangemaakt!")).toBeVisible();
  await page.getByRole("button", { name: "Inloggen" }).click();
  await expect(page).toHaveURL("/nl/");
  await expect(page.getByRole("button", { name: "Aanmelden" })).toBeHidden();
  await page.goto("/login");
  await expect(page.getByRole("button", { name: "Uitloggen" })).toBeVisible();
});
