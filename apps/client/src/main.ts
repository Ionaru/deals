import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { angularConfiguration } from "./app/angular.config.js";
import { AppComponent } from "./app/app.component.js";
import { environment } from "./environments/environment.js";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, angularConfiguration).catch((error) =>
  console.error(error),
);
