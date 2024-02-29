import { AsyncPipe, DecimalPipe } from "@angular/common";
import { Component, computed, inject, LOCALE_ID } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { ResultOf } from "@graphql-typed-document-node/core";

import { DealImageComponent } from "../../../components/deal-image/deal-image.component";
import { PriceCurrentComponent } from "../../../components/price-current/price-current.component";
import {
  productQuery,
  ProductsService,
} from "../../../services/products.service";

@Component({
  imports: [
    DealImageComponent,
    MatProgressSpinner,
    AsyncPipe,
    PriceCurrentComponent,
  ],
  standalone: true,
  styleUrl: "./product.component.scss",
  templateUrl: "./product.component.html",
})
export class ProductComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #productsService = inject(ProductsService);
  readonly #locale = inject(LOCALE_ID);

  readonly params = toSignal(this.#route.paramMap);
  readonly productId = computed(() => this.params()?.get("id") ?? null);
  readonly product$ = computed(() => {
    const productId = this.productId();
    return productId
      ? this.#productsService.getProduct(productId).valueChanges
      : null;
  });

  getLastDeal(data: ResultOf<typeof productQuery>) {
    if (!data.product || data.product.dealHistory.length === 0) {
      return "Never";
    }

    const lastDeal = data.product.dealHistory.at(0);
    if (!lastDeal) {
      return "Never";
    }

    const pipe = new DecimalPipe(this.#locale);
    const dealPrice =
      "€ " +
      pipe.transform(lastDeal.dealPrice / lastDeal.dealQuantity, "1.2-2");

    if (!lastDeal.deletedOn) {
      return `Now! ${dealPrice} each item when buying ${lastDeal.dealQuantity}!`;
    }

    return (
      new Date(lastDeal.deletedOn).toLocaleDateString() +
      `: ${dealPrice} each item when buying ${lastDeal.dealQuantity}!`
    );
  }
}
