// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// eslint-disable-next-line unicorn/prevent-abbreviations
import "./commands";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doRDPCommand = (command: string, parameters?: any) =>
  Cypress.automation("remote:debugger:protocol", {
    command,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    params: parameters,
  });

beforeEach(() => {
  cy.log("Clearing database");
  cy.task("clearDB", undefined, { log: false });

  cy.log("Enabling WebAuthn in RDP");
  doRDPCommand("WebAuthn.enable");
  doRDPCommand("WebAuthn.addVirtualAuthenticator", {
    options: {
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      protocol: "ctap2",
      transport: "usb",
    },
  });

  cy.log("Setting up GraphQL spy");
  cy.intercept("/graphql", (request) => {
    request.on("response", (response) => {
      response.setDelay(500);
      response.setThrottle(1000);
    });
  }).as("GraphQL");
});

afterEach(() => {
  cy.log("Disabling WebAuthn in RDP");
  doRDPCommand("WebAuthn.disable");
});
