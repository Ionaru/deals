/* eslint-disable sonarjs/no-duplicate-string */
describe("client", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.task("clearDB");
  });

  it("should show the login page", () => {
    cy.get(".signup-button").should("be.visible").click();
    cy.get("button").contains("I already have an account").should("be.visible");
    cy.get("button")
      .contains("I want to create a new account")
      .should("be.visible");
    cy.get("button").contains("Logout").should("not.exist");
  });
});
