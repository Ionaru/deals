import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, inject } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withViewTransitions } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import {
  provideApollo,
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
    provideRouter(appRouting, withViewTransitions()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideApollo(
      () => ({
          cache: new InMemoryCache(),
          link: inject(HttpLink).create({ uri: "/graphql" }),
        }),
      {
        useInitialLoading: true,
        useMutationLoading: true,
      }
    ),
    { provide: LOCAL_STORAGE, useValue: localStorage },
    { provide: SESSION_STORAGE, useValue: sessionStorage },
    { provide: WINDOW, useValue: window },
  ],
};
