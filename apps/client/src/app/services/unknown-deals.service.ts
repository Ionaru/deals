import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { typedGql } from "../zeus/typedDocumentNode";

@Injectable({
  providedIn: "root",
})
export class UnknownDealsService {
  readonly #apollo = inject(Apollo);

  getUnknownDeals$() {
    return this.#apollo.query({
      query: typedGql("query")({
        unknownDeals: {
          deal: true,
          id: true,
          productUrl: true,
          shop: {
            name: true,
          },
          updatedOn: true,
        },
      }),
    });
  }

  resolveUnknownDeals$(id: string) {
    return this.#apollo.mutate({
      mutation: typedGql("mutation")({
        resolveUnknownDeal: [
          {
            id,
          },
          true,
        ],
      }),
    });
  }
}
