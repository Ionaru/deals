import { test, expect } from "../support/fixtures.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should show the home page", async ({ page }) => {
  await expect(page.locator("mat-spinner")).toBeVisible();
  await expect(page.getByText("Aanmelden")).toBeVisible();
  await expect(page.locator("mat-spinner")).toBeHidden();
  await expect(page.getByText("Pagina 1 van 1")).toBeVisible();
  await expect(
    page.getByText("Geen overeenkomende aanbiedingen gevonden"),
  ).toBeVisible();
});
