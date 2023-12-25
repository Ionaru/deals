import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { SidenavService } from "../../services/sidenav.service";
import { SidenavContentComponent } from "../sidenav-content/sidenav-content.component";
import { SignupButtonComponent } from "../signup-button/signup-button.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";

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
  standalone: true,
  styleUrl: "./sidenav-container.component.css",
  templateUrl: "./sidenav-container.component.html",
})
export class SidenavContainerComponent implements OnInit {
  @ViewChild("drawer") matDrawer?: MatDrawer;

  readonly #sidenavService = inject(SidenavService);

  ngOnInit() {
    this.#sidenavService.opened$.subscribe(() => {
      this.matDrawer?.toggle();
    });
  }

  close() {
    this.matDrawer?.close();
  }
}
