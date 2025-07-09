import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";

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
    ReactiveFormsModule,
  ],
  styleUrl: "./home.component.css",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  readonly messages = {
    header: $localize`Current deals`,
  };

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

  dealsShopFilterControl = new FormControl<string | null>(null);
  dealsShopFilter = toSignal(this.dealsShopFilterControl.valueChanges);

  dealsSortControl = new FormControl<DealSortChoices>(
    this.initialSort.value,
    Validators.required.bind(this),
  );
  dealsSort = toSignal(this.dealsSortControl.valueChanges);

  dealsOrderControl = new FormControl<Order>(
    this.initialOrder.value,
    Validators.required.bind(this),
  );
  dealsOrder = toSignal(this.dealsOrderControl.valueChanges);

  page$ = signal(1);
  dealsQuery$ = signal<string | null>(null);
  reloader$ = signal(0);

  lastSeenTotalItems = signal(0);
  lastSeenItemsPerPage = signal(0);

  shops = toSignal(
    this.#shopsService.shops$.pipe(map((data) => data.data?.shops ?? [])),
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
      if (pageAsNumber && pageAsNumber > 0 && this.page$() !== pageAsNumber) {
        this.page$.set(pageAsNumber);
      }
    }
  }

  #parseShopFromUrl(url: string) {
    const shop = this.#router.parseUrl(url).queryParamMap.get("shop");
    if (shop && typeof shop === "string" && this.dealsShopFilter() !== shop) {
      this.dealsShopFilterControl.setValue(shop);
    } else if (!shop && this.dealsShopFilter() !== null) {
      this.dealsShopFilterControl.setValue(null);
    }
  }

  #parseSortFromUrl(url: string) {
    const sort = this.#router
      .parseUrl(url)
      .queryParamMap.get("sort") as DealSortChoices | null;
    const options = this.sorting.map((option) => option.value);
    if (sort && options.includes(sort) && this.dealsSort() !== sort) {
      this.dealsSortControl.setValue(sort as unknown as DealSortChoices);
    } else if (!sort && this.dealsSort() !== this.initialSort.value) {
      this.dealsSortControl.setValue(this.initialSort.value);
    }
  }

  #parseOrderFromUrl(url: string) {
    const order = this.#router
      .parseUrl(url)
      .queryParamMap.get("order") as Order | null;
    const options = this.ordering.map((option) => option.value);
    if (order && options.includes(order) && this.dealsOrder() !== order) {
      this.dealsOrderControl.setValue(order as unknown as Order);
    } else if (
      !order &&
      this.dealsOrderControl.value !== this.initialOrder.value
    ) {
      this.dealsOrderControl.setValue(this.initialOrder.value);
    }
  }

  #parseQueryFromUrl(url: string) {
    const query = this.#router.parseUrl(url).queryParamMap.get("query");
    if (query && typeof query === "string") {
      if (this.dealsQuery$() !== query) {
        this.dealsQuery$.set(query);
      }
    } else if (!query && this.dealsQuery$() !== null) {
      this.dealsQuery$.set(null);
    }
  }

  deals = rxResource({
    params: () => {
      return {
        page: this.page$(),
        shop: this.dealsShopFilter(),
        sort: this.dealsSort(),
        order: this.dealsOrder(),
        query: this.dealsQuery$(),
      };
    },
    stream: ({ params }) =>
      this.#dealsService.getDeals(
        params.page,
        params.shop ?? null,
        params.sort ?? this.initialSort.value,
        params.order ?? this.initialOrder.value,
        params.query,
      ).valueChanges,
  });

  constructor() {
    effect(() => {
      const deals = this.deals.value();
      if (deals?.data) {
        this.lastSeenTotalItems.set(deals.data.deals.meta.totalItems ?? 0);
        this.lastSeenItemsPerPage.set(deals.data.deals.meta.itemsPerPage ?? 0);
      }
    });

    effect(() => {
      void this.#router.navigate([], {
        queryParams: {
          order: this.dealsOrder(),
          page: this.page$(),
          query: this.dealsQuery$(),
          shop: this.dealsShopFilter(),
          sort: this.dealsSort(),
        },
      });
    });
  }

  handlePageEvent($event: PageEvent) {
    this.page$.set($event.pageIndex + 1);
  }

  onSearchChange(query: string | null) {
    this.dealsQuery$.set(query);
    this.page$.set(1);
  }
}
