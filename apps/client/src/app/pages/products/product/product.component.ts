/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate, formatNumber } from "@angular/common";
import {
  Component,
  computed,
  inject,
  InputSignal,
  LOCALE_ID,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { ResultOf } from "@graphql-typed-document-node/core";
import { NgxEchartsDirective } from "ngx-echarts";
import { filter, switchMap } from "rxjs";

import { DealImageComponent } from "../../../components/deal-image/deal-image.component.js";
import { PriceCurrentComponent } from "../../../components/price-current/price-current.component.js";
import { DarkModeService } from "../../../services/dark-mode.service.js";
import {
  productQuery,
  ProductsService,
} from "../../../services/products.service.js";

type ExtractGeneric<Type> = Type extends InputSignal<infer X> ? X : never;

@Component({
  imports: [
    DealImageComponent,
    MatProgressSpinner,
    PriceCurrentComponent,
    NgxEchartsDirective,
  ],
  styleUrl: "./product.component.css",
  templateUrl: "./product.component.html",
})
export class ProductComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #productsService = inject(ProductsService);
  readonly #darkModeService = inject(DarkModeService);
  readonly #locale = inject(LOCALE_ID);

  readonly params = toSignal(this.#route.paramMap);
  readonly productId = computed(() => this.params()?.get("id") ?? null);

  readonly product = toSignal(
    toObservable(this.productId).pipe(
      filter(Boolean),
      switchMap(
        (productId) => this.#productsService.getProduct(productId).valueChanges,
      ),
    ),
  );

  readonly isDarkModeActive = toSignal(
    this.#darkModeService.isDarkModeActive$(),
  );

  readonly chartOptions = computed<
    ExtractGeneric<NgxEchartsDirective["options"]>
  >(() => {
    interface Data {
      x: string[];
      y: number[];
    }

    const data: Data = { x: [], y: [] };
    const priceHistory = this.product()?.data.product?.priceHistory;

    if (priceHistory) {
      for (const item of priceHistory) {
        data.y.push(item.price);
        data.x.push(item.createdOn);
      }
    }

    if (!data) {
      throw new Error("No data");
    }

    return {
      animation: false,
      series: [
        {
          data: data.y,
          name: "line",
          type: "line",
        },
      ],
      title: {
        text: `Price history of ${this.product()?.data.product?.name}`,
        textStyle: {
          color: this.isDarkModeActive() ? "#eee" : "#000",
          fontSize: 16,
          fontWeight: "bold",
        },
        x: "center",
      },
      tooltip: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (parameters: any) => `
      ${formatDate(parameters.name, "longDate", this.#locale)}:
      <strong>€ ${formatNumber(parameters.data, this.#locale, "1.2-2")}</strong>
  `,
      },
      xAxis: {
        axisLabel: {
          align: "left",
          formatter: (value: string) =>
            formatDate(value, "mediumDate", this.#locale),
        },
        data: data.x,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        axisLabel: {
          align: "right",
          formatter: "€ {value}",
        },
        name: "Price",
        splitLine: {
          lineStyle: {
            color: this.isDarkModeActive() ? "#444" : "#eee",
          },
        },
        type: "value",
      },
    };
  });

  getLastDeal(data: ResultOf<typeof productQuery>) {
    if (!data.product || data.product.dealHistory.length === 0) {
      return "Never";
    }

    const lastDeal = data.product.dealHistory.at(0);
    if (!lastDeal) {
      return "Never";
    }

    const dealPrice =
      "€ " +
      formatNumber(
        lastDeal.dealPrice / lastDeal.dealQuantity,
        this.#locale,
        "1.2-2",
      );

    if (!lastDeal.deletedOn) {
      return `Now! ${dealPrice} each item when buying ${lastDeal.dealQuantity}!`;
    }

    return (
      new Date(lastDeal.deletedOn).toLocaleDateString() +
      `: ${dealPrice} each item when buying ${lastDeal.dealQuantity}!`
    );
  }
}
