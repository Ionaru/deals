import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { ProductSortChoices, Order, $ } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const productQuery = typedGql("query")({
  product: [
    {
      id: $("id", "ID!"),
    },
    {
      dealHistory: {
        createdOn: true,
        dealPrice: true,
        dealQuantity: true,
        deletedOn: true,
      },
      id: true,
      imageUrl: true,
      name: true,
      price: true,
      priceHistory: {
        createdOn: true,
        price: true,
      },
      productUrl: true,
      shop: {
        name: true,
      },
    },
  ],
});

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  readonly #apollo = inject(Apollo);

  getProduct(id: string) {
    return this.#apollo.watchQuery({
      errorPolicy: "all",
      query: productQuery,
      variables: {
        id,
      },
    });
  }

  getProducts(
    page = 1,
    shop: string | undefined,
    sort: ProductSortChoices,
    order: Order,
    query: string | undefined,
  ) {
    return this.#apollo.watchQuery({
      errorPolicy: "all",
      query: typedGql("query")({
        products: [
          {
            limit: 24,
            order,
            page,
            query,
            shop,
            sort: [sort],
          },
          {
            items: {
              id: true,
              imageUrl: true,
              name: true,
              price: true,
              productUrl: true,
              shop: {
                name: true,
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
