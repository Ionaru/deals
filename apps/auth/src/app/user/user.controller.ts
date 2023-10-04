/* eslint-disable sort-keys */

import { AMSMResponse, MSMessage, MSMPayload } from '@deals/api';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
    verifyAuthentication,
    verifyRegistration,
} from '@passwordless-id/webauthn/dist/esm/server.js';
import {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';

import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(MSMessage.REGISTER_USER)
    async registerUser(
        payload: MSMPayload<MSMessage.REGISTER_USER>,
    ): Promise<AMSMResponse<MSMessage.REGISTER_USER>> {
        const registration = JSON.parse(
            payload.registration,
        ) as RegistrationEncoded;

        const registrationParsed = await verifyRegistration(registration, {
            challenge: (challenge: string) =>
                this.userService.checkChallenge(challenge),
            origin: () => true,
        });

        await this.userService.storeUser(registrationParsed);

        return true;
    }

    @MessagePattern(MSMessage.LOGIN_USER)
    async loginUser(
        payload: MSMPayload<MSMessage.LOGIN_USER>,
    ): Promise<AMSMResponse<MSMessage.LOGIN_USER>> {
        const authentication = JSON.parse(
            payload.authentication,
        ) as AuthenticationEncoded;

        const existingUser = await this.userService.findExistingUser(
            authentication.credentialId,
        );

        if (!existingUser) {
            return;
        }

        const credential = existingUser.credentials.find(
            (userCredential) =>
                userCredential.id === authentication.credentialId,
        );
        if (!credential) {
            return;
        }

        try {
            await verifyAuthentication(authentication, credential, {
                challenge: (challenge: string) =>
                    this.userService.checkChallenge(challenge),
                origin: () => true,
                userVerified: true,
                counter: 1,
            });
        } catch {
            return;
        }

        return existingUser.id.toHexString();
    }
}
