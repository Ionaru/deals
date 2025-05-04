import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { SidenavService } from "../../services/sidenav.service.js";
import { SidenavContentComponent } from "../sidenav-content/sidenav-content.component.js";
import { SignupButtonComponent } from "../signup-button/signup-button.component.js";
import { ToolbarComponent } from "../toolbar/toolbar.component.js";

@Component({
  imports: [
    MatSidenavModule,
    RouterOutlet,
    SignupButtonComponent,
    ToolbarComponent,
    RouterLink,
    RouterLinkActive,
    SidenavContentComponent,
  ],
  selector: "deals-sidenav-container",
  styleUrl: "./sidenav-container.component.css",
  templateUrl: "./sidenav-container.component.html",
})
export class SidenavContainerComponent implements OnInit {
  @ViewChild("drawer") matDrawer?: MatDrawer;

  readonly #sidenavService = inject(SidenavService);

  ngOnInit() {
    this.#sidenavService.opened$.subscribe(() => {
      if (this.matDrawer) {
        void this.matDrawer.toggle();
      }
    });
  }

  close() {
    if (this.matDrawer) {
      void this.matDrawer.close();
    }
  }
}
