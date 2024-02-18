import { inject, Injectable, isDevMode } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, firstValueFrom, map, tap } from "rxjs";

import { appName } from "../app.config";
import { ModelTypes } from "../zeus";
import { typedGql } from "../zeus/typedDocumentNode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly #apollo = inject(Apollo);

  readonly #user$ = new BehaviorSubject<ModelTypes["Query"]["user"] | null>(
    null,
  );

  readonly user$ = this.#user$.asObservable();
  readonly isAdmin$ = this.user$.pipe(map((user) => user?.isAdmin));
  readonly isLoggedIn$ = this.user$.pipe(map(Boolean));

  async login() {
    const { client } = await import("@passwordless-id/webauthn");
    const challenge = await firstValueFrom(this.#getChallenge());
    const authentication = await client.authenticate(
      [],
      challenge.data.challenge,
      {
        debug: isDevMode(),
      },
    );

    const authenticationResult = await firstValueFrom(
      this.#sendLogin(JSON.stringify(authentication)),
    );

    return authenticationResult.data.loginUser;
  }

  async register(username?: string, existingUser = false) {
    const { client } = await import("@passwordless-id/webauthn");
    const challenge = await firstValueFrom(this.#getChallenge());
    const nameToRegister = username || this.#getDefaultAccountName();

    const originalFunction: CredentialsContainer["create"] =
      window.navigator.credentials.create;
    window.navigator.credentials.create = (
      options: CredentialCreationOptions,
    ) => {
      if (options.publicKey) {
        options.publicKey.user.displayName = `${appName} Account`;
        options.publicKey.rp.name = appName;
      }
      return originalFunction.call(window.navigator.credentials, options);
    };

    const registration = await client.register(
      nameToRegister,
      challenge.data.challenge,
      {
        attestation: true,
        authenticatorType: "both",
        debug: isDevMode(),
        discoverable: "required",
        userVerification: "required",
      },
    );

    window.navigator.credentials.create = originalFunction;

    if (existingUser) {
      const addResult = await firstValueFrom(
        this.#sendAddPasskey(JSON.stringify(registration)),
      );
      return addResult.data.addPasskey ? nameToRegister : undefined;
    } else {
      const registerResult = await firstValueFrom(
        this.#sendRegister(JSON.stringify(registration)),
      );
      return registerResult.data.registerUser ? nameToRegister : undefined;
    }
  }

  async logout() {
    const logoutResult = await firstValueFrom(this.#sendLogout());
    this.#user$.next(null);
    return logoutResult.data.logoutUser;
  }

  getUser(id?: string) {
    return firstValueFrom(
      this.#apollo
        .query({
          fetchPolicy: "no-cache",
          query: typedGql("query")({
            user: [
              {
                id,
              },
              {
                id: true,
                isAdmin: true,
                username: true,
              },
            ],
          }),
        })
        .pipe(
          tap(({ data }) => {
            this.#user$.next(data.user);
          }),
        ),
    );
  }

  #getDefaultAccountName() {
    const dateInIsoFormat = new Date().toISOString().slice(0, 10);
    return `${appName}-${dateInIsoFormat}`;
  }

  #sendLogout() {
    return this.#apollo.query({
      fetchPolicy: "no-cache",
      query: typedGql("mutation")({
        logoutUser: true,
      }),
    });
  }

  #sendLogin(authentication: string) {
    return this.#apollo.query({
      fetchPolicy: "no-cache",
      query: typedGql("mutation")({
        loginUser: [
          {
            authentication,
          },
          true,
        ],
      }),
    });
  }

  #sendRegister(registration: string) {
    return this.#apollo.query({
      fetchPolicy: "no-cache",
      query: typedGql("mutation")({
        registerUser: [
          {
            registration,
          },
          true,
        ],
      }),
    });
  }

  #sendAddPasskey(registration: string) {
    return this.#apollo.query({
      fetchPolicy: "no-cache",
      query: typedGql("mutation")({
        addPasskey: [
          {
            registration,
          },
          true,
        ],
      }),
    });
  }

  #getChallenge() {
    return this.#apollo.query({
      fetchPolicy: "no-cache",
      query: typedGql("query")({
        challenge: true,
      }),
    });
  }
}
