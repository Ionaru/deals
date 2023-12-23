import { Component, inject, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";

import { appName, appNameAlternate } from "./app.config";
import { SignupButtonComponent } from "./components/signup-button/signup-button.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AuthService } from "./services/auth.service";

@Component({
  imports: [RouterOutlet, ToolbarComponent, SignupButtonComponent],
  selector: "deals-root",
  standalone: true,
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = appName;
  alternateTitle = appNameAlternate;

  readonly #authService = inject(AuthService);
  readonly #iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.#iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }

  async ngOnInit() {
    await this.#authService.getUser();
  }
}
