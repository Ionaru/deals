/* eslint-disable sort-keys */
import { inject, Injectable } from '@angular/core';
import { client } from '@passwordless-id/webauthn';
import { Apollo } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

import { WINDOW } from '../../tokens/injection-tokens';
import { appName } from '../app.config';
import { typedGql } from '../zeus/typedDocumentNode';

import { SerializationService } from './serialization.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly #window = inject(WINDOW);
    readonly #apollo = inject(Apollo);
    readonly #serializationService = inject(SerializationService);

    async login() {
        // TODO: If credentials are valid, log in.

        const challenge = await firstValueFrom(this.getChallenge());
        const authentication = await client.authenticate(
            [],
            challenge.data.getChallenge,
        );

        const authenticationResult = await firstValueFrom(
            this.sendLogin(JSON.stringify(authentication)),
        );

        return authenticationResult.data.loginUser;
    }

    async register(username?: string) {
        const challenge = await firstValueFrom(this.getChallenge());

        const originalFunction: CredentialsContainer['create'] =
            window.navigator.credentials.create;
        window.navigator.credentials.create = (
            options: CredentialCreationOptions,
        ) => {
            options.publicKey.authenticatorSelection.residentKey = 'preferred';
            options.publicKey.user.displayName = `${appName} Account`;
            options.publicKey.rp.name = appName;
            return originalFunction.call(window.navigator.credentials, options);
        };

        const registration = await client.register(
            username || this.getDefaultAccountName(),
            challenge.data.getChallenge,
            {
                debug: true,
                attestation: true,
                userVerification: 'required',
                authenticatorType: 'roaming',
            },
        );

        window.navigator.credentials.create = originalFunction;

        const registerResult = await firstValueFrom(
            this.sendRegister(JSON.stringify(registration)),
        );

        return registerResult.data.registerUser;
    }

    getDefaultAccountName() {
        const dateInIsoFormat = new Date().toISOString().slice(0, 10);
        return `${appName}-${dateInIsoFormat}`;
    }

    sendLogin(authentication: string) {
        return this.#apollo.query({
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
            query: typedGql('mutation')({
                loginUser: [
                    {
                        authentication,
                    },
                    true,
                ],
            }),
        });
    }

    sendRegister(registration: string) {
        return this.#apollo.query({
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
            query: typedGql('mutation')({
                registerUser: [
                    {
                        registration,
                    },
                    true,
                ],
            }),
        });
    }

    getChallenge() {
        return this.#apollo.query({
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
            query: typedGql('query')({
                getChallenge: true,
            }),
        });
    }
}
