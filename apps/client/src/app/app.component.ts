import { Component, inject, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";

import { appName } from "./app.config";
import { SidenavContainerComponent } from "./components/sidenav-container/sidenav-container.component";
import { SignupButtonComponent } from "./components/signup-button/signup-button.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AuthService } from "./services/auth.service";

@Component({
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SignupButtonComponent,
    MatSidenavModule,
    SidenavContainerComponent,
  ],
  selector: "deals-root",
  standalone: true,
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = appName;

  readonly #authService = inject(AuthService);
  readonly #iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.#iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }

  async ngOnInit() {
    await this.#authService.getUser();
  }
}
