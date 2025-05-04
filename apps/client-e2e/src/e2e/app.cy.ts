describe("client", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show the home page", () => {
    cy.get("mat-spinner").should("be.visible");
    cy.get(".signup-button").contains("Aanmelden").should("be.visible");
    cy.get("mat-spinner").should("not.exist");
    cy.get(".mat-mdc-paginator-range-label").should("contain", "1 van 1");
  });
});
