import { AsyncPipe } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { DarkModeService } from "../../services/dark-mode.service";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";
import { ToolbarLanguageSwitchComponent } from "../toolbar-language-switch/toolbar-language-switch.component";
import { ToolbarLinkComponent } from "../toolbar-link/toolbar-link.component";

@Component({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    AsyncPipe,
    ToolbarIconButtonComponent,
    ToolbarLinkComponent,
    MatMenuModule,
    ToolbarLanguageSwitchComponent,
    MatTooltipModule,
  ],
  selector: "deals-toolbar",
  standalone: true,
  styleUrls: ["./toolbar.component.scss"],
  templateUrl: "./toolbar.component.html",
})
export class ToolbarComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) alternateTitle!: string;

  hovering = false;

  readonly #authService = inject(AuthService);
  readonly #darkModeService = inject(DarkModeService);

  isLoggedIn$ = this.#authService.isLoggedIn$;
  isAdmin$ = this.#authService.isAdmin$;

  notifications = [];

  get isDarkMode(): boolean {
    return this.#darkModeService.isDarkModeActive();
  }

  toggleDarkMode(): void {
    this.#darkModeService.toggleDarkMode();
  }

  setHovering(hovering: boolean) {
    this.hovering = hovering;
  }
}
