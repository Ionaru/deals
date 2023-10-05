import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

import { environment } from "../environments/environment";
import {
  LOCAL_STORAGE,
  SESSION_STORAGE,
  WINDOW,
} from "../tokens/injection-tokens";

import appRouting from "./app.routing";
import { mockDataInterceptor } from "./interceptors/mock-data.interceptor";

export const appName = "Dealert";
export const appNameAlternate = "Deal Alert";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRouting),
    provideHttpClient(
      withInterceptors(environment.production ? [] : [mockDataInterceptor]),
    ),
    provideAnimations(),
    importProvidersFrom(ApolloModule),
    {
      deps: [HttpLink],
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: "/graphql" }),
      }),
    },
    { provide: LOCAL_STORAGE, useValue: localStorage },
    { provide: SESSION_STORAGE, useValue: sessionStorage },
    { provide: WINDOW, useValue: window },
  ],
};
