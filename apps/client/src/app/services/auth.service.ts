import { inject, Injectable, isDevMode } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, firstValueFrom, map, tap } from "rxjs";

import { appName } from "../app.config.js";
import { ModelTypes, $ } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const challengeQuery = typedGql("query")({
  challenge: true,
});

export const addPasskeyMutation = typedGql("mutation")({
  addPasskey: [
    {
      registration: $("registration", "String!"),
    },
    true,
  ],
});

export const registerMutation = typedGql("mutation")({
  registerUser: [
    {
      registration: $("registration", "String!"),
    },
    true,
  ],
});

export const loginMutation = typedGql("mutation")({
  loginUser: [
    {
      authentication: $("authentication", "String!"),
    },
    true,
  ],
});

export const logoutMutation = typedGql("mutation")({
  logoutUser: true,
});

export const userQuery = typedGql("query")({
  user: [
    {
      id: $("id", "String"),
    },
    {
      id: true,
      isAdmin: true,
      username: true,
    },
  ],
});

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

    return authenticationResult.data?.loginUser;
  }

  async register(username?: string, existingUser = false) {
    const { client } = await import("@passwordless-id/webauthn");
    const challenge = await firstValueFrom(this.#getChallenge());
    const nameToRegister = username ?? this.#getDefaultAccountName();

    const originalFunction: CredentialsContainer["create"] =
      // eslint-disable-next-line @typescript-eslint/unbound-method
      globalThis.navigator.credentials.create;
    globalThis.navigator.credentials.create = (
      options: CredentialCreationOptions,
    ) => {
      if (options.publicKey) {
        options.publicKey.user.displayName = `${appName} Account`;
        options.publicKey.rp.name = appName;
      }
      return originalFunction.call(globalThis.navigator.credentials, options);
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

    globalThis.navigator.credentials.create = originalFunction;

    if (existingUser) {
      const addResult = await firstValueFrom(
        this.#sendAddPasskey(JSON.stringify(registration)),
      );
      return addResult.data?.addPasskey ? nameToRegister : undefined;
    } else {
      const registerResult = await firstValueFrom(
        this.#sendRegister(JSON.stringify(registration)),
      );
      return registerResult.data?.registerUser ? nameToRegister : undefined;
    }
  }

  async logout() {
    const logoutResult = await firstValueFrom(this.#sendLogout());
    this.#user$.next(null);
    return logoutResult.data?.logoutUser;
  }

  getUser(id?: string) {
    return firstValueFrom(
      this.#apollo
        .query({
          fetchPolicy: "no-cache",
          query: userQuery,
          variables: {
            id,
          },
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
    return this.#apollo.mutate({
      mutation: logoutMutation,
    });
  }

  #sendLogin(authentication: string) {
    return this.#apollo.mutate({
      mutation: loginMutation,
      variables: {
        authentication,
      },
    });
  }

  #sendRegister(registration: string) {
    return this.#apollo.mutate({
      mutation: registerMutation,
      variables: {
        registration,
      },
    });
  }

  #sendAddPasskey(registration: string) {
    return this.#apollo.mutate({
      mutation: addPasskeyMutation,
      variables: {
        registration,
      },
    });
  }

  #getChallenge() {
    return this.#apollo.query({
      fetchPolicy: "network-only",
      query: challengeQuery,
    });
  }
}
