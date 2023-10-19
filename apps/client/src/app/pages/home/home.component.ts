import {
  AsyncPipe,
  DecimalPipe,
  JsonPipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { BehaviorSubject, switchMap, tap } from "rxjs";

import { DealsService } from "../../services/deals.service";

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    NgOptimizedImage,
    NgIf,
    NgForOf,
    AsyncPipe,
    DecimalPipe,
    JsonPipe,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  selector: "deals-home",
  standalone: true,
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly #snackBar = inject(MatSnackBar);
  readonly #dealsService = inject(DealsService);
  readonly #router = inject(Router);

  page$ = new BehaviorSubject(1);

  ngOnInit() {
    const page = this.#router.parseUrl(this.#router.url).queryParams.page;
    if (page && typeof page === "string") {
      const pageAsNumber = Number.parseInt(page, 10);
      if (!Number.isNaN(pageAsNumber)) {
        this.page$.next(pageAsNumber);
      }
    }
  }

  deals$ = this.page$.pipe(
    switchMap((page) => this.#dealsService.getDeals(page).valueChanges),
    tap((data) => {
      if (data.errors?.length) {
        const snackBar = this.#snackBar.open(
          data.errors.at(0).message,
          "Opnieuw proberen",
        );
        snackBar.onAction().subscribe(() => {
          // TODO: Retry
        });
      }
    }),
  );

  ngOnDestroy() {
    this.#snackBar.dismiss();
  }

  trackDealsBy(_index: number, deal: any) {
    return deal.id;
  }

  handlePageEvent($event: PageEvent) {
    this.page$.next($event.pageIndex + 1);
    this.#router.navigate([], {
      queryParams: {
        page: $event.pageIndex + 1,
      },
    });
  }
}
