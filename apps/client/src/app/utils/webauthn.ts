import { appName } from "../app.config.js";

import { toBuffer } from "./encoding.js";

export const buildCredentialCreationOptions = (
  challenge: string,
  username: string,
): CredentialCreationOptions => ({
  publicKey: {
    // Challenge that the authenticator must sign
    challenge: toBuffer(challenge),

    // Information about Relying Party (the server)
    rp: {
      // The ID of the Relying Party, will be validated on the server
      // Also acts as the "scope" of the credential
      id: globalThis.location.hostname,
      // A user-friendly name for the app, visible in some authenticator UIs
      name: appName,
    },

    // Options for the public key
    pubKeyCredParams: [
      // ES256 (Webauthn's default algorithm)
      { alg: -7, type: "public-key" },
      // RS256 (for Windows Hello)
      { alg: -257, type: "public-key" },
    ],

    // Time (in ms) after which the operation will be aborted
    timeout: 300_000,

    // Options for the authenticator device
    authenticatorSelection: {
      // Requires the authenticator device to validate the user (through PIN, fingerprint, etc.)
      userVerification: "required",
      // Require the credential to exist on a "roaming" authenticator device, like a phone or YubiKey, or allow the local PC.
      // "undefined" means either is allowed.
      // authenticatorAttachment: undefined,
      // Allow the user to choose between multiple accounts on the authenticator device
      residentKey: "required",
    },

    // Whether we want information about the authenticator device
    // https://w3c.github.io/webauthn/#enum-attestation-convey
    attestation: "none",

    // Info about the user that is trying to register, none of this is sent to the server
    user: {
      // A unique ID for the user record in the authenticator device
      id: toBuffer(crypto.randomUUID()),
      // A Duo of name fields for the user record in the authenticator device
      // Most authenticator devices will display these to the user
      // UI will be simplified when both are the same
      name: username,
      displayName: username,
    },
  },
});

export const buildCredentialRequestOptions = (
  challenge: string,
): CredentialRequestOptions => ({
  publicKey: {
    // Challenge that the authenticator must sign
    challenge: toBuffer(challenge),

    // The ID of the Relying Party, will be validated on the server
    // Also acts as the "scope" of the credential
    rpId: globalThis.location.hostname,

    // Specify specific credentials that are allowed to authenticate
    // Useful for 2FA
    // Or leave empty to allow any user
    allowCredentials: [],

    // Time (in ms) after which the operation will be aborted
    timeout: 300_000,

    // Requires the authenticator device to validate the user (through PIN, fingerprint, etc.)
    userVerification: "required",
  },
});
