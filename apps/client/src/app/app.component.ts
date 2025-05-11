import { Component, inject, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";

import { appName } from "./app.config.js";
import { SidenavContainerComponent } from "./components/sidenav-container/sidenav-container.component.js";
import { SignupButtonComponent } from "./components/signup-button/signup-button.component.js";
import { ToolbarComponent } from "./components/toolbar/toolbar.component.js";
import { AuthService } from "./services/auth.service.js";

@Component({
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SignupButtonComponent,
    SidenavContainerComponent,
  ],
  selector: "deals-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = appName;

  readonly #authService = inject(AuthService);
  readonly #iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.#iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }

  ngOnInit() {
    this.#authService.init$.subscribe();
  }
}
