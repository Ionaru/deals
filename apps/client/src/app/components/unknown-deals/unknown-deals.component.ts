import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
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

  #resolvedUnknownDeals = signal<string[]>([]);
  #unknownDeal = toSignal(
    this.#unknownDealsService
      .getUnknownDeals$()
      .pipe(map((result) => result.data.unknownDeals)),
    { initialValue: [] },
  );
  dataSource = computed(() =>
    this.#unknownDeal().filter(
      (deal) => !this.#resolvedUnknownDeals().includes(deal.id),
    ),
  );

  displayedColumns: string[] = ["shop", "productUrl", "deal", "actions"];

  resolveUnknownDeal(id: string) {
    this.#unknownDealsService.resolveUnknownDeals$(id).subscribe(() => {
      this.#resolvedUnknownDeals.update((resolved) => [...resolved, id]);
    });
  }
}
