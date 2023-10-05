import { NgIf } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    NgIf,
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

  readonly #darkModeService = inject(DarkModeService);

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
