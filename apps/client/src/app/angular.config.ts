import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";
import {
  APOLLO_FLAGS,
  APOLLO_OPTIONS,
  ApolloModule,
  Flags,
} from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

import {
  LOCAL_STORAGE,
  SESSION_STORAGE,
  WINDOW,
} from "../tokens/injection-tokens";

import appRouting from "./app.routing";

export const angularConfiguration: ApplicationConfig = {
  providers: [
    provideRouter(appRouting),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_FLAGS,
      useFactory: (): Flags => ({
        useInitialLoading: true,
        useMutationLoading: true,
      }),
    },
    {
      deps: [HttpLink],
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<unknown> => ({
        cache: new InMemoryCache(),
        connectToDevTools: false,
        link: httpLink.create({ uri: "/graphql" }),
      }),
    },
    { provide: LOCAL_STORAGE, useValue: localStorage },
    { provide: SESSION_STORAGE, useValue: sessionStorage },
    { provide: WINDOW, useValue: window },
  ],
};
