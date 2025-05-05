import { AsyncPipe } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatOption } from "@angular/material/autocomplete";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelect } from "@angular/material/select";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, tap } from "rxjs";

import { DealCardComponent } from "../../components/deal-card/deal-card.component.js";
import { DealsPaginatorComponent } from "../../components/deals-paginator/deals-paginator.component.js";
import { DealsQueryInputComponent } from "../../components/deals-query-input/deals-query-input.component.js";
import { ProductCardComponent } from "../../components/product-card/product-card.component.js";
import { ProductsService } from "../../services/products.service.js";
import { ShopsService } from "../../services/shops.service.js";
import { ProductSortChoices, Order } from "../../zeus/index.js";

@Component({
  imports: [
    AsyncPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule,
    DealsQueryInputComponent,
    MatProgressSpinner,
    DealCardComponent,
    DealsPaginatorComponent,
    ProductCardComponent,
  ],
  styleUrl: "./products.component.css",
  templateUrl: "./products.component.html",
})
export class ProductsComponent {
  readonly #shopsService = inject(ShopsService);
  readonly #productsService = inject(ProductsService);
  readonly #router = inject(Router);

  page = signal(1);

  lastSeenTotalItems = signal(0);
  lastSeenItemsPerPage = signal(0);

  initialSort = {
    label: $localize`Product name`,
    value: ProductSortChoices.PRODUCT_NAME,
  };

  initialOrder = {
    label: $localize`Ascending`,
    value: Order.ASCENDING,
  };

  shopChoice = model<string>();
  shops = toSignal(
    this.#shopsService.shops$.pipe(map((data) => data.data?.shops ?? [])),
  );

  sortingChoice = model<ProductSortChoices>(this.initialSort.value);
  sorting = [
    this.initialSort,
    {
      label: $localize`Product price`,
      value: ProductSortChoices.PRODUCT_PRICE,
    },
  ];

  orderingChoice = model<Order>(this.initialOrder.value);
  ordering = [
    this.initialOrder,
    {
      label: $localize`Descending`,
      value: Order.DESCENDING,
    },
  ];

  productQuery = model<string>();

  url = toSignal(
    this.#router.events.pipe(
      filter(
        (navEvent): navEvent is NavigationEnd =>
          navEvent instanceof NavigationEnd,
      ),
      map((navEvent) => navEvent.urlAfterRedirects),
    ),
  );

  products$ = computed(() => {
    const page = this.page();
    const shop = this.shopChoice();
    const sort = this.sortingChoice();
    const order = this.orderingChoice();
    const query = this.productQuery() ?? undefined;

    return this.#productsService
      .getProducts(page, shop, sort, order, query)
      .valueChanges.pipe(
        tap((data) => {
          if (!data.loading) {
            this.lastSeenTotalItems.set(
              data.data?.products?.meta.totalItems ?? 0,
            );
            this.lastSeenItemsPerPage.set(
              data.data?.products?.meta.itemsPerPage ?? 0,
            );
          }
        }),
      );
  });

  constructor() {
    this.#parseUrl(this.#router.url);

    // Resets the page number when the user changes the sorting/filter options
    effect(() => {
      this.shopChoice();
      this.sortingChoice();
      this.orderingChoice();
      this.productQuery();
      this.page.set(1);
    });

    // Updates the URL when the user changes the sorting/filter options
    effect(() => {
      const page = this.page();
      const shop = this.shopChoice();
      const sort = this.sortingChoice();
      const order = this.orderingChoice();
      const query = this.productQuery();

      void this.#router.navigate([], {
        queryParams: {
          order,
          page,
          query,
          shop,
          sort,
        },
      });
    });

    // Resets the sorting/filter options when the user clicks the nav button
    effect(() => {
      const url = this.url();
      if (url) {
        const queryParameters = this.#router.parseUrl(url).queryParams;
        if (Object.keys(queryParameters).length === 0) {
          this.#parseUrl(url);
        }
      }
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
      if (pageAsNumber && pageAsNumber > 0 && this.page() !== pageAsNumber) {
        this.page.set(pageAsNumber);
      }
    }
  }

  #parseShopFromUrl(url: string) {
    const shop = this.#router.parseUrl(url).queryParamMap.get("shop");
    if (shop && typeof shop === "string" && this.shopChoice() !== shop) {
      this.shopChoice.set(shop);
    } else if (!shop && this.shopChoice() !== undefined) {
      this.shopChoice.set(undefined);
    }
  }

  #parseSortFromUrl(url: string) {
    const sort = this.#router
      .parseUrl(url)
      .queryParamMap.get("sort") as ProductSortChoices | null;
    const options = this.sorting.map((option) => option.value);
    if (sort && options.includes(sort) && this.sortingChoice() !== sort) {
      this.sortingChoice.set(sort as unknown as ProductSortChoices);
    } else if (!sort && this.sortingChoice() !== this.initialSort.value) {
      this.sortingChoice.set(this.initialSort.value);
    }
  }

  #parseOrderFromUrl(url: string) {
    const order = this.#router
      .parseUrl(url)
      .queryParamMap.get("order") as Order | null;
    const options = this.ordering.map((option) => option.value);
    if (order && options.includes(order) && this.orderingChoice() !== order) {
      this.orderingChoice.set(order as unknown as Order);
    } else if (!order && this.orderingChoice() !== this.initialOrder.value) {
      this.orderingChoice.set(this.initialOrder.value);
    }
  }

  #parseQueryFromUrl(url: string) {
    const query = this.#router.parseUrl(url).queryParamMap.get("query");
    if (query && typeof query === "string") {
      if (this.productQuery() !== query) {
        this.productQuery.set(query);
      }
    } else if (!query && this.productQuery() !== undefined) {
      this.productQuery.set(undefined);
    }
  }
}
