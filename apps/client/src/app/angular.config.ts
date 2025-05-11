import { provideHttpClient, withFetch } from "@angular/common/http";
import {
  ApplicationConfig,
  inject,
  provideExperimentalZonelessChangeDetection,
  isDevMode,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideRouter,
  TitleStrategy,
  withViewTransitions,
} from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { InMemoryCache } from "@apollo/client/core";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { provideEchartsCore } from "ngx-echarts";

import {
  LOCAL_STORAGE,
  NAVIGATOR,
  SESSION_STORAGE,
  WINDOW,
} from "../tokens/injection-tokens.js";

import appRouting from "./app.routing.js";
import { MyTitleStrategy } from "./services/my-title.strategy.js";

export const angularConfiguration: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRouting, withViewTransitions()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideEchartsCore({
      echarts: () => import("echarts"),
    }),
    provideApollo(
      () => ({
        cache: new InMemoryCache(),
        link: inject(HttpLink).create({ uri: "/graphql" }),
      }),
      {
        useInitialLoading: true,
        useMutationLoading: true,
      },
    ),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    { provide: TitleStrategy, useClass: MyTitleStrategy },
    { provide: LOCAL_STORAGE, useValue: localStorage },
    { provide: SESSION_STORAGE, useValue: sessionStorage },
    { provide: WINDOW, useValue: globalThis },
    { provide: NAVIGATOR, useValue: navigator },
  ],
};
