/* eslint-disable sonarjs/no-duplicate-string */
describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should show the signup button on any page except the login page", () => {
    cy.visit("/");
    cy.get(".signup-button").should("be.visible");
    cy.visit("/notifications");
    cy.get(".signup-button").should("be.visible");
    cy.visit("/login");
    cy.get(".signup-button").should("not.exist");
  });

  it("should direct the user to the login page by clicking the signup button", () => {
    cy.visit("/");
    cy.get(".signup-button").click();
    cy.location("pathname").should("include", "/login");
    cy.visit("/notifications");
    cy.get(".signup-button").click();
    cy.location("pathname").should("include", "/login");
  });

  it("should show the login page", () => {
    cy.get("button").contains("Ik heb al een account").should("be.visible");
    cy.get("button")
      .contains("Ik wil een nieuw account aanmaken")
      .should("be.visible");
    cy.get("button").contains("Uitloggen").should("not.exist");
  });

  it("should be able to register a new account", () => {
    cy.get("button").contains("Ik wil een nieuw account aanmaken").click();
    cy.get("mat-form-field").type("E2E Test User");
    cy.get("button").contains("Registreren").click();
    cy.get("body").should("contain", "Account aangemaakt!");
    cy.get("body").should("contain", "Name: E2E Test User");
    cy.get("button").contains("Log in").should("be.visible").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.get(".signup-button").should("not.exist");
    cy.visit("/login");
    cy.get("button").contains("Uitloggen").should("be.visible");
  });
});
