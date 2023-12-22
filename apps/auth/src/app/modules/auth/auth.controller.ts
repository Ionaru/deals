import { MSMessage, MSMPayload, MSMResponse } from "@deals/api";
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  verifyAuthentication,
  verifyRegistration,
} from "@passwordless-id/webauthn/dist/esm/server.js";
import {
  AuthenticationEncoded,
  RegistrationEncoded,
} from "@passwordless-id/webauthn/dist/esm/types";

import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MSMessage.REGISTER_USER)
  async registerUser(
    payload: MSMPayload<MSMessage.REGISTER_USER>,
  ): Promise<MSMResponse<MSMessage.REGISTER_USER>> {
    const registration = JSON.parse(
      payload.registration,
    ) as RegistrationEncoded;

    const registrationParsed = await verifyRegistration(registration, {
      challenge: (challenge: string) =>
        this.authService.checkChallenge(challenge),
      origin: () => true,
    });

    await this.authService.storeUser(registrationParsed);

    return true;
  }

  @MessagePattern(MSMessage.ADD_PASSKEY)
  async addPasskey(
    payload: MSMPayload<MSMessage.ADD_PASSKEY>,
  ): Promise<MSMResponse<MSMessage.ADD_PASSKEY>> {
    const registration = JSON.parse(
      payload.registration,
    ) as RegistrationEncoded;

    const registrationParsed = await verifyRegistration(registration, {
      challenge: (challenge: string) =>
        this.authService.checkChallenge(challenge),
      origin: () => true,
    });

    await this.authService.addPasskey(payload.user, registrationParsed);

    return true;
  }

  @MessagePattern(MSMessage.LOGIN_USER)
  async loginUser(
    payload: MSMPayload<MSMessage.LOGIN_USER>,
  ): Promise<MSMResponse<MSMessage.LOGIN_USER>> {
    const authentication = JSON.parse(
      payload.authentication,
    ) as AuthenticationEncoded;

    const existingUser = await this.authService.findExistingUser(
      authentication.credentialId,
    );

    if (!existingUser) {
      Logger.warn(
        `User not found: ${authentication.credentialId}`,
        AuthController.name,
      );
      return null;
    }

    const credential = existingUser.credentials.find(
      (userCredential) => userCredential.id === authentication.credentialId,
    );
    if (!credential) {
      Logger.warn("Credentials not found", AuthController.name);
      return null;
    }

    try {
      await verifyAuthentication(authentication, credential, {
        challenge: (challenge: string) =>
          this.authService.checkChallenge(challenge),
        counter: -1,
        origin: () => true,
        userVerified: true,
      });
    } catch (error) {
      Logger.warn(
        `Authentication failed: ${credential.id}`,
        AuthController.name,
      );
      Logger.error(error);
      return null;
    }

    return existingUser.id.toHexString();
  }
}
