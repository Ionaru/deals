import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { NavigationEnd, Router } from "@angular/router";
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs";

import { DealCardComponent } from "../../components/deal-card/deal-card.component.js";
import { DealsPaginatorComponent } from "../../components/deals-paginator/deals-paginator.component.js";
import { DealsQueryInputComponent } from "../../components/deals-query-input/deals-query-input.component.js";
import { DealsService } from "../../services/deals.service.js";
import { ShopsService } from "../../services/shops.service.js";
import { DealSortChoices, Order } from "../../zeus/index.js";

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DealsPaginatorComponent,
    DealCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    DealsQueryInputComponent,
  ],
  styleUrl: "./home.component.css",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly messages = {
    header: $localize`Current deals`,
  };

  readonly #snackBar = inject(MatSnackBar);
  readonly #dealsService = inject(DealsService);
  readonly #shopsService = inject(ShopsService);
  readonly #router = inject(Router);

  initialSort = {
    label: $localize`Product name`,
    value: DealSortChoices.PRODUCT_NAME,
  };

  initialOrder = {
    label: $localize`Ascending`,
    value: Order.ASCENDING,
  };

  page$ = new BehaviorSubject(1);
  dealsShopFilter$ = new BehaviorSubject<string | null>(null);
  dealsSort$ = new BehaviorSubject<DealSortChoices>(this.initialSort.value);
  dealsOrder$ = new BehaviorSubject<Order>(this.initialOrder.value);
  dealsQuery$ = new BehaviorSubject<string | null>(null);
  reloader$ = new BehaviorSubject(0);

  lastSeenTotalItems = signal(0);
  lastSeenItemsPerPage = signal(0);

  shops$ = this.#shopsService.shops$.pipe(
    map((data) => data.data?.shops ?? []),
  );

  sorting = [
    this.initialSort,
    {
      label: $localize`Product price`,
      value: DealSortChoices.PRODUCT_PRICE,
    },
    {
      label: $localize`Deal price`,
      value: DealSortChoices.DEAL_PRICE,
    },
    {
      label: $localize`Savings`,
      value: DealSortChoices.SAVINGS,
    },
    {
      label: $localize`Savings %`,
      value: DealSortChoices.SAVINGS_PERCENTAGE,
    },
  ];

  ordering = [
    this.initialOrder,
    {
      label: $localize`Descending`,
      value: Order.DESCENDING,
    },
  ];

  ngOnInit() {
    this.#parseUrl(this.#router.url);

    this.#router.events
      .pipe(
        filter(
          (navEvent): navEvent is NavigationEnd =>
            navEvent instanceof NavigationEnd,
        ),
      )
      .subscribe((navEvent) => {
        this.#parseUrl(navEvent.urlAfterRedirects);
      });
  }

  #parseUrl(url: string) {
    this.#parsePageFromUrl(url);
    this.#parseShopFromUrl(url);
    this.#parseSortFromUrl(url);
    this.#parseOrderFromUrl(url);
    this.#parseQueryFromUrl(url);
  }

  #parsePageFromUrl(url: string) {
    const page = this.#router.parseUrl(url).queryParamMap.get("page") ?? "1";
    if (page && typeof page === "string") {
      const pageAsNumber = Number.parseInt(page, 10);
      if (
        pageAsNumber &&
        pageAsNumber > 0 &&
        this.page$.value !== pageAsNumber
      ) {
        this.page$.next(pageAsNumber);
      }
    }
  }

  #parseShopFromUrl(url: string) {
    const shop = this.#router.parseUrl(url).queryParamMap.get("shop");
    if (
      shop &&
      typeof shop === "string" &&
      this.dealsShopFilter$.value !== shop
    ) {
      this.dealsShopFilter$.next(shop);
    } else if (!shop && this.dealsShopFilter$.value !== null) {
      this.dealsShopFilter$.next(null);
    }
  }

  #parseSortFromUrl(url: string) {
    const sort = this.#router
      .parseUrl(url)
      .queryParamMap.get("sort") as DealSortChoices | null;
    const options = this.sorting.map((option) => option.value);
    if (sort && options.includes(sort) && this.dealsSort$.value !== sort) {
      this.dealsSort$.next(sort as unknown as DealSortChoices);
    } else if (!sort && this.dealsSort$.value !== this.initialSort.value) {
      this.dealsSort$.next(this.initialSort.value);
    }
  }

  #parseOrderFromUrl(url: string) {
    const order = this.#router
      .parseUrl(url)
      .queryParamMap.get("order") as Order | null;
    const options = this.ordering.map((option) => option.value);
    if (order && options.includes(order) && this.dealsOrder$.value !== order) {
      this.dealsOrder$.next(order as unknown as Order);
    } else if (!order && this.dealsOrder$.value !== this.initialOrder.value) {
      this.dealsOrder$.next(this.initialOrder.value);
    }
  }

  #parseQueryFromUrl(url: string) {
    const query = this.#router.parseUrl(url).queryParamMap.get("query");
    if (query && typeof query === "string") {
      if (this.dealsQuery$.value !== query) {
        this.dealsQuery$.next(query);
      }
    } else if (!query && this.dealsQuery$.value !== null) {
      this.dealsQuery$.next(null);
    }
  }

  deals$ = combineLatest([
    this.page$,
    this.dealsShopFilter$,
    this.dealsSort$,
    this.dealsOrder$,
    this.dealsQuery$.pipe(
      map((query) => {
        if (query === null) {
          return query;
        }

        if (query.length < 3) {
          return null;
        }

        return query;
      }),
    ),
    this.reloader$,
  ]).pipe(
    switchMap(
      ([page, shop, sort, order, query]) =>
        this.#dealsService.getDeals(page, shop, sort, order, query)
          .valueChanges,
    ),
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

      if (!data.loading) {
        this.lastSeenTotalItems.set(data.data?.deals?.meta.totalItems ?? 0);
        this.lastSeenItemsPerPage.set(data.data?.deals?.meta.itemsPerPage ?? 0);
      }
    }),
  );

  ngOnDestroy() {
    this.#snackBar.dismiss();
  }

  handlePageEvent($event: PageEvent) {
    this.page$.next($event.pageIndex + 1);
    this.#updateUrl();
  }

  onShopSelectionChange(change: MatSelectChange) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.dealsShopFilter$.next(change.value);
    this.page$.next(1);
    this.#updateUrl();
  }

  onSortingSelectionChange(change: MatSelectChange) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.dealsSort$.next(change.value);
    this.page$.next(1);
    this.#updateUrl();
  }

  onOrderSelectionChange(change: MatSelectChange) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.dealsOrder$.next(change.value);
    this.page$.next(1);
    this.#updateUrl();
  }

  onSearchChange(query: string | null) {
    this.dealsQuery$.next(query);
    this.page$.next(1);
    this.#updateUrl();
  }

  #updateUrl() {
    void this.#router.navigate([], {
      queryParams: {
        order: this.dealsOrder$.value,
        page: this.page$.value,
        query: this.dealsQuery$.value,
        shop: this.dealsShopFilter$.value,
        sort: this.dealsSort$.value,
      },
    });
  }
}
