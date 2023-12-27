import {
  AsyncPipe,
  DecimalPipe,
  JsonPipe,
  NgOptimizedImage,
} from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, switchMap, tap } from "rxjs";

import { DealCardComponent } from "../../components/deal-card/deal-card.component";
import { DealsPaginatorComponent } from "../../components/deals-paginator/deals-paginator.component";
import { DealsService } from "../../services/deals.service";

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    NgOptimizedImage,
    AsyncPipe,
    DecimalPipe,
    JsonPipe,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DealsPaginatorComponent,
    DealCardComponent,
  ],
  selector: "deals-home",
  standalone: true,
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly messages = {
    header: $localize`Current deals`,
  };

  readonly #snackBar = inject(MatSnackBar);
  readonly #dealsService = inject(DealsService);
  readonly #router = inject(Router);

  page$ = new BehaviorSubject(1);
  reloader$ = new BehaviorSubject(0);

  ngOnInit() {
    const page = this.#router.parseUrl(this.#router.url).queryParams.page;
    if (page && typeof page === "string") {
      const pageAsNumber = Number.parseInt(page, 10);
      if (pageAsNumber && pageAsNumber > 0) {
        this.page$.next(pageAsNumber);
      }
    }
  }

  deals$ = combineLatest([this.page$, this.reloader$]).pipe(
    switchMap(([page]) => this.#dealsService.getDeals(page).valueChanges),
    tap((data) => {
      if (data.errors?.length) {
        const snackBar = this.#snackBar.open(
          "Error: " + data.errors.at(0)?.message || "Unknown error",
          "Opnieuw proberen",
        );
        snackBar.onAction().subscribe(() => {
          this.reloader$.next(this.reloader$.value + 1);
        });
      }
    }),
  );

  ngOnDestroy() {
    this.#snackBar.dismiss();
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
