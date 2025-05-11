import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";

import { SidenavService } from "../../services/sidenav.service.js";
import { SidenavContentComponent } from "../sidenav-content/sidenav-content.component.js";

@Component({
  imports: [MatSidenavModule, SidenavContentComponent],
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
