import { Component, inject, output } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { NavigationService } from "../../services/navigation.service";

@Component({
  imports: [MatListModule, RouterLink, RouterLinkActive],
  selector: "deals-sidenav-content",
  styleUrl: "./sidenav-content.component.css",
  templateUrl: "./sidenav-content.component.html",
})
export class SidenavContentComponent {
  readonly navigated = output<void>();

  readonly #navigationService = inject(NavigationService);
  routes$$ = this.#navigationService.routes$$;

  close() {
    this.navigated.emit();
  }
}
