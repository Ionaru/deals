import { DatePipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { map } from "rxjs";

import { UnknownDealsService } from "../../services/unknown-deals.service.js";

@Component({
  imports: [MatTableModule, MatButtonModule, DatePipe],
  selector: "deals-unknown-deals",
  styleUrl: "./unknown-deals.component.css",
  templateUrl: "./unknown-deals.component.html",
})
export class UnknownDealsComponent {
  readonly #unknownDealsService = inject(UnknownDealsService);

  readonly #resolvedUnknownDeals = signal<string[]>([]);
  readonly #unknownDeal = toSignal(
    this.#unknownDealsService
      .getUnknownDeals$()
      .pipe(map((result) => result.data.unknownDeals)),
    { initialValue: [] },
  );
  dataSource = computed(() =>
    this.#unknownDeal().filter(
      (deal) => !this.#resolvedUnknownDeals().includes(deal.id as string),
    ),
  );

  displayedColumns: string[] = [
    "date",
    "shop",
    "productUrl",
    "deal",
    "actions",
  ];

  resolveUnknownDeal(id: string) {
    this.#unknownDealsService.resolveUnknownDeals$(id).subscribe(() => {
      this.#resolvedUnknownDeals.update((resolved) => [...resolved, id]);
    });
  }
}
