import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { map } from "rxjs";

import { UnknownDealsService } from "../../services/unknown-deals.service";

@Component({
  imports: [MatTableModule, MatButtonModule],
  selector: "deals-unknown-deals",
  standalone: true,
  styleUrl: "./unknown-deals.component.css",
  templateUrl: "./unknown-deals.component.html",
})
export class UnknownDealsComponent {
  readonly #unknownDealsService = inject(UnknownDealsService);

  displayedColumns: string[] = ["shop", "productUrl", "deal", "actions"];
  dataSource = this.#unknownDealsService
    .getUnknownDeals$()
    .pipe(map((result) => result.data.unknownDeals));

  resolveUnknownDeal(id: string) {
    this.#unknownDealsService.resolveUnknownDeals$(id).subscribe();
  }
}
