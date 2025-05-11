import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { $ } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const unknownDealsQuery = typedGql("query")({
  unknownDeals: {
    deal: true,
    id: true,
    productUrl: true,
    shop: {
      name: true,
    },
    updatedOn: true,
  },
});

export const resolveUnknownDealMutation = typedGql("mutation")({
  resolveUnknownDeal: [
    {
      id: $("id", "String!"),
    },
    true,
  ],
});

@Injectable({
  providedIn: "root",
})
export class UnknownDealsService {
  readonly #apollo = inject(Apollo);

  unknownDeals$ = this.#apollo.query({
    query: unknownDealsQuery,
  });

  resolveUnknownDeals$(id: string) {
    return this.#apollo.mutate({
      mutation: resolveUnknownDealMutation,
      variables: {
        id,
      },
    });
  }
}
