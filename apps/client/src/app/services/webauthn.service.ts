import { inject, Injectable } from "@angular/core";
import { ExtendedAuthenticatorTransport } from "@passwordless-id/webauthn/dist/esm/types.js";
import { firstValueFrom } from "rxjs";

import { NAVIGATOR } from "../../tokens/injection-tokens.js";
import { appName } from "../app.config.js";
import { toBase64 } from "../utils/encoding.js";
import {
  buildCredentialCreationOptions,
  buildCredentialRequestOptions,
} from "../utils/webauthn.js";

import { AuthService } from "./auth.service.js";

@Injectable({
  providedIn: "root",
})
export class WebauthnService {
  readonly #authService = inject(AuthService);
  readonly #navigator = inject(NAVIGATOR);

  async login() {
    const challenge = await firstValueFrom(this.#authService.getChallenge$);
    if (!challenge) {
      throw new Error("No challenge found");
    }

    const { credential, response } = await this.#getCredentials(challenge);
    if (!credential || !response) {
      throw new Error("No credential or response found");
    }

    const loginResponse = await firstValueFrom(
      this.#authService.login$({
        id: credential.id,
        rawId: toBase64(credential.rawId),
        type: "public-key",
        clientExtensionResults: {},
        response: {
          authenticatorData: toBase64(response.authenticatorData),
          clientDataJSON: toBase64(response.clientDataJSON),
          signature: toBase64(response.signature),
          userHandle: response.userHandle ? toBase64(response.userHandle) : "",
        },
      }),
    );

    if (!loginResponse) {
      throw new Error("No login response found");
    }

    return loginResponse;
  }

  async register(username?: string) {
    const challenge = await firstValueFrom(this.#authService.getChallenge$);
    if (!challenge) {
      throw new Error("No challenge found");
    }

    username = username ?? this.#getDefaultAccountName();

    const { credential, response, publicKey } = await this.createCredential(
      challenge,
      username,
    );

    if (!credential || !response || !publicKey) {
      throw new Error("No credential or response found");
    }

    const registerResponse = await firstValueFrom(
      this.#authService.register$({
        id: credential.id,
        rawId: toBase64(credential.rawId),
        user: {
          id: credential.id,
          name: username,
          displayName: username,
        },
        response: {
          attestationObject: toBase64(response.attestationObject),
          authenticatorData: toBase64(response.getAuthenticatorData()),
          clientDataJSON: toBase64(response.clientDataJSON),
          transports:
            response.getTransports() as ExtendedAuthenticatorTransport[],
          publicKey: toBase64(publicKey),
          publicKeyAlgorithm: response.getPublicKeyAlgorithm(),
        },
        type: "public-key",
        clientExtensionResults: {},
      }),
    );

    if (!registerResponse) {
      throw new Error("No register response found");
    }

    return username;
  }

  async addPasskey(username?: string) {
    const challenge = await firstValueFrom(this.#authService.getChallenge$);
    if (!challenge) {
      throw new Error("No challenge found");
    }

    username = username ?? this.#getDefaultAccountName();

    const { credential, response, publicKey } = await this.createCredential(
      challenge,
      username,
    );

    if (!credential || !response || !publicKey) {
      throw new Error("No credential or response found");
    }

    const registerResponse = await firstValueFrom(
      this.#authService.addPasskey$({
        id: credential.id,
        rawId: toBase64(credential.rawId),
        user: {
          id: credential.id,
          name: username,
          displayName: username,
        },
        response: {
          attestationObject: toBase64(response.attestationObject),
          authenticatorData: toBase64(response.getAuthenticatorData()),
          clientDataJSON: toBase64(response.clientDataJSON),
          transports:
            response.getTransports() as ExtendedAuthenticatorTransport[],
          publicKey: toBase64(publicKey),
          publicKeyAlgorithm: response.getPublicKeyAlgorithm(),
        },
        type: "public-key",
        clientExtensionResults: {},
      }),
    );

    if (!registerResponse) {
      throw new Error("No register response found");
    }

    return registerResponse;
  }

  async #getCredentials(challenge: string) {
    const credential = (await this.#navigator.credentials.get(
      buildCredentialRequestOptions(challenge),
    )) as PublicKeyCredential | null;
    if (!credential) {
      return {};
    }

    const response = credential.response as AuthenticatorAssertionResponse;
    return { credential, response };
  }

  async createCredential(challenge: string, username: string) {
    const credential = (await this.#navigator.credentials.create(
      buildCredentialCreationOptions(challenge, username),
    )) as PublicKeyCredential | null;
    if (!credential) {
      return {};
    }

    const response = credential.response as AuthenticatorAttestationResponse;
    const publicKey = response.getPublicKey();
    if (!publicKey) {
      return {};
    }

    return { credential, response, publicKey };
  }

  #getDefaultAccountName() {
    const dateInIsoFormat = new Date().toISOString().slice(0, 10);
    return `${appName}-${dateInIsoFormat}`;
  }
}
