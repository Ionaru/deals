import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { DealSortChoices, Order } from "../zeus";
import { typedGql } from "../zeus/typedDocumentNode";

@Injectable({
  providedIn: "root",
})
export class DealsService {
  readonly #apollo = inject(Apollo);

  getDeals(page = 1, shop: string | null, sort: DealSortChoices, order: Order) {
    return this.#apollo.watchQuery({
      errorPolicy: "all",
      query: typedGql("query")({
        deals: [
          {
            limit: 24,
            order,
            page,
            shop,
            sort: [sort],
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
      }),
    });
  }
}
