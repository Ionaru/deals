import { AsyncPipe } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { NavigationService } from "../../services/navigation.service";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";
import { ToolbarLanguageSwitchComponent } from "../toolbar-language-switch/toolbar-language-switch.component";
import { ToolbarLinkComponent } from "../toolbar-link/toolbar-link.component";
import { ToolbarSidenavButtonComponent } from "../toolbar-sidenav-button/toolbar-sidenav-button.component";

@Component({
  imports: [
    AsyncPipe,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    ToolbarIconButtonComponent,
    ToolbarLanguageSwitchComponent,
    ToolbarLinkComponent,
    ToolbarSidenavButtonComponent,
  ],
  selector: "deals-toolbar",
  standalone: true,
  styleUrls: ["./toolbar.component.css"],
  templateUrl: "./toolbar.component.html",
})
export class ToolbarComponent {
  @Input({ required: true }) title!: string;

  readonly #authService = inject(AuthService);
  readonly #darkModeService = inject(DarkModeService);
  readonly #navigationService = inject(NavigationService);

  isLoggedIn$ = this.#authService.isLoggedIn$;
  routes$$ = this.#navigationService.routes$$;

  notifications = [];

  get isDarkMode(): boolean {
    return this.#darkModeService.isDarkModeActive();
  }

  toggleDarkMode(): void {
    this.#darkModeService.toggleDarkMode();
  }
}
