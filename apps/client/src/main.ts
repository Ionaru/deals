import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { angularConfiguration } from "./app/angular.config";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, angularConfiguration).catch((error) =>
  // eslint-disable-next-line no-console
  console.error(error),
);
