import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { DealSortChoices, Order, $ } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const dealsQuery = typedGql("query")({
  deals: [
    {
      limit: 24,
      order: $("order", "Order!"),
      page: $("page", "Int!"),
      query: $("query", "String"),
      shop: $("shop", "String"),
      sort: $("sort", "[DealSortChoices!]"),
    },
    {
      items: {
        dealPrice: true,
        dealQuantity: true,
        id: true,
        product: {
          imageUrl: true,
          name: true,
          price: true,
          productUrl: true,
          shop: {
            name: true,
          },
        },
      },
      meta: {
        currentPage: true,
        itemCount: true,
        itemsPerPage: true,
        totalItems: true,
        totalPages: true,
      },
    },
  ],
});

@Injectable({
  providedIn: "root",
})
export class DealsService {
  readonly #apollo = inject(Apollo);

  getDeals(
    page = 1,
    shop: string | null,
    sort: DealSortChoices,
    order: Order,
    query: string | null,
  ) {
    return this.#apollo.watchQuery({
      errorPolicy: "all",
      query: dealsQuery,
      variables: {
        limit: 24,
        order,
        page,
        query: query ?? undefined,
        shop: shop ?? undefined,
        sort: [sort],
      },
    });
  }
}
