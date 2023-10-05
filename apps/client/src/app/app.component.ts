import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { filter, map } from "rxjs";

import { appName, appNameAlternate } from "./app.config";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@Component({
  imports: [
    RouterOutlet,
    ToolbarComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    NgIf,
  ],
  selector: "deals-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = appName;
  alternateTitle = appNameAlternate;
  readonly loginRoute = "/login";

  readonly #iconRegistry = inject(MatIconRegistry);
  readonly #router = inject(Router);

  showSignupButton = this.#router.events.pipe(
    filter(
      (routerEvent): routerEvent is NavigationEnd =>
        routerEvent instanceof NavigationEnd,
    ),
    map((routerEvent) => routerEvent.url !== this.loginRoute),
  );

  constructor() {
    this.#iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }
}
