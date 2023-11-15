const doRDPCommand = (command: string, parameters?: any) => Cypress.automation("remote:debugger:protocol", {
    command,
    params: parameters,
  });

beforeEach(() => {
  doRDPCommand("WebAuthn.enable");
  doRDPCommand("WebAuthn.addVirtualAuthenticator", {
    options: {
      protocol: "ctap2",
      transport: "usb",
    },
  });
});

afterEach(() => {
  doRDPCommand("WebAuthn.disable");
});
