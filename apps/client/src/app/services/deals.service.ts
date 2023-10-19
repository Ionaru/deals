import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { typedGql } from "../zeus/typedDocumentNode";

@Injectable({
  providedIn: "root",
})
export class DealsService {
  readonly #apollo = inject(Apollo);

  getDeals(page = 1) {
    return this.#apollo.watchQuery({
      errorPolicy: "all",
      query: typedGql("query")({
        deals: [
          {
            page,
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
