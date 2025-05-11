import { inject, Injectable } from "@angular/core";
import type {
  AuthenticationJSON,
  RegistrationJSON,
} from "@passwordless-id/webauthn/dist/esm/types.js";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, map, switchMap, tap } from "rxjs";

import { ModelTypes, $, Roles } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const meQuery = typedGql("query")({
  me: {
    username: true,
    roles: true,
    sub: true,
  },
});

export const createChallengeMutation = typedGql("mutation")({
  createChallenge: true,
});

export const loginMutation = typedGql("mutation")({
  loginUser: [
    {
      id: $("id", "String!"),
      response: {
        authenticatorData: $("authenticatorData", "String!"),
        clientDataJSON: $("clientDataJSON", "String!"),
        signature: $("signature", "String!"),
      },
    },
    true,
  ],
});

export const registerMutation = typedGql("mutation")({
  registerUser: [
    {
      id: $("id", "String!"),
      response: {
        authenticatorData: $("authenticatorData", "String!"),
        clientDataJSON: $("clientDataJSON", "String!"),
        publicKey: $("publicKey", "String!"),
        publicKeyAlgorithm: $("publicKeyAlgorithm", "Float!"),
      },
      user: {
        name: $("userName", "String!"),
      },
    },
    true,
  ],
});

export const addPasskeyMutation = typedGql("mutation")({
  addUserCredential: [
    {
      id: $("id", "String!"),
      response: {
        authenticatorData: $("authenticatorData", "String!"),
        clientDataJSON: $("clientDataJSON", "String!"),
        publicKey: $("publicKey", "String!"),
        publicKeyAlgorithm: $("publicKeyAlgorithm", "Float!"),
      },
      user: {
        name: $("userName", "String!"),
      },
    },
    true,
  ],
});

export const logoutMutation = typedGql("mutation")({
  logoutUser: true,
});

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly #apollo = inject(Apollo);

  readonly #userSubject = new BehaviorSubject<ModelTypes["MeDTO"] | null>(null);
  user$ = this.#userSubject.asObservable();

  readonly isAdmin$ = this.user$.pipe(
    map((user) => user?.roles.includes(Roles.ADMIN)),
  );

  readonly init$ = this.#apollo
    .query({
      fetchPolicy: "no-cache",
      query: meQuery,
    })
    .pipe(
      tap((result) => {
        this.#userSubject.next(result.data.me ?? null);
      }),
    );

  readonly getChallenge$ = this.#apollo
    .mutate({
      useMutationLoading: false,
      mutation: createChallengeMutation,
    })
    .pipe(map((result) => result.data?.createChallenge));

  login$(credential: AuthenticationJSON) {
    return this.#apollo
      .mutate({
        useMutationLoading: false,
        mutation: loginMutation,
        variables: {
          id: credential.id,
          authenticatorData: credential.response.authenticatorData,
          clientDataJSON: credential.response.clientDataJSON,
          signature: credential.response.signature,
        },
      })
      .pipe(
        map((result) => result.data?.loginUser),
        switchMap((result) => this.init$.pipe(map(() => result))),
      );
  }

  register$(credential: RegistrationJSON) {
    return this.#apollo
      .mutate({
        useMutationLoading: false,
        mutation: registerMutation,
        variables: {
          id: credential.id,
          authenticatorData: credential.response.authenticatorData,
          clientDataJSON: credential.response.clientDataJSON,
          publicKey: credential.response.publicKey,
          publicKeyAlgorithm: credential.response.publicKeyAlgorithm,
          userName: credential.user.name,
        },
      })
      .pipe(map((result) => result.data?.registerUser));
  }

  addPasskey$(credential: RegistrationJSON) {
    return this.#apollo
      .mutate({
        useMutationLoading: false,
        mutation: addPasskeyMutation,
        variables: {
          id: credential.id,
          authenticatorData: credential.response.authenticatorData,
          clientDataJSON: credential.response.clientDataJSON,
          publicKey: credential.response.publicKey,
          publicKeyAlgorithm: credential.response.publicKeyAlgorithm,
          userName: credential.user.name,
        },
      })
      .pipe(map((result) => result.data?.addUserCredential));
  }

  readonly logout$ = this.#apollo
    .mutate({
      fetchPolicy: "no-cache",
      mutation: logoutMutation,
    })
    .pipe(
      tap(() => this.#userSubject.next(null)),
      // switchMap(() => this.#router.navigate(["/"])),
    );
}
