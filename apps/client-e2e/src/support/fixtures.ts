import { test as base } from "@playwright/test";
import { MongoClient } from "mongodb";

import {
  createAuthenticator,
  disableWebAuthn,
  enableWebAuthn,
} from "./webauthn.js";

const database = new MongoClient(
  "mongodb://e2e:DontTellAnyoneThisPassword@localhost:27017",
);

// import { LoginPage } from "./commands/login-page.js";
// import { OnboardingPage } from "./commands/onboarding-page.js";
// import { PrivacyStatementPage } from "./commands/privacy-statement-page.js";
// Declare the types of your fixtures.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MyFixtures {
  //   onboardingPage: OnboardingPage;
  //   privacyStatementPage: PrivacyStatementPage;
  //   loginPage: LoginPage;
}

base.beforeEach(async ({ page }) => {
  await database.connect();
  await database.db("E2E-Deals-Auth").dropDatabase();
  await database.db("E2E-Deals-Session").dropDatabase();

  await page.route("**/*", async (route) => {
    await new Promise((f) => setTimeout(f, 500));
    await route.continue();
  });

  await enableWebAuthn(page);
  await createAuthenticator(page);
});

base.afterEach(async ({ page }) => {
  await disableWebAuthn(page);
});

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  //   onboardingPage: async ({ page }, use) => {
  //     await use(new OnboardingPage(page));
  //   },
  //   privacyStatementPage: async ({ page }, use) => {
  //     await use(new PrivacyStatementPage(page));
  //   },
  //   loginPage: async ({ page }, use) => {
  //     await use(new LoginPage(page));
  //   },
});

export { expect } from "@playwright/test";
