import { Page } from "@playwright/test";

export const createCDPSession = async (page: Page) => {
  return await page.context().newCDPSession(page);
};

export const enableWebAuthn = async (page: Page) => {
  const developmentTools = await createCDPSession(page);
  await developmentTools.send("WebAuthn.enable");
};

export const disableWebAuthn = async (page: Page) => {
  const developmentTools = await createCDPSession(page);
  await developmentTools.send("WebAuthn.disable");
};

export const createAuthenticator = async (page: Page): Promise<string> => {
  const developmentTools = await createCDPSession(page);
  const { authenticatorId } = await developmentTools.send(
    "WebAuthn.addVirtualAuthenticator",
    {
      options: {
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        protocol: "ctap2",
        transport: "usb",
      },
    },
  );
  return authenticatorId;
};
