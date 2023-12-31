import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { SidenavService } from "../../services/sidenav.service";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";

@Component({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    ToolbarIconButtonComponent,
  ],
  selector: "deals-toolbar-sidenav-button",
  standalone: true,
  styleUrl: "./toolbar-sidenav-button.component.css",
  templateUrl: "./toolbar-sidenav-button.component.html",
})
export class ToolbarSidenavButtonComponent {
  readonly #sidenavService = inject(SidenavService);

  toggle() {
    this.#sidenavService.open();
  }
}
