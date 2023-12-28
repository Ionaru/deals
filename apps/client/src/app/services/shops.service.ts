import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { typedGql } from "../zeus/typedDocumentNode";

@Injectable({
  providedIn: "root",
})
export class ShopsService {
  readonly #apollo = inject(Apollo);

  getShops() {
    return this.#apollo.query({
      errorPolicy: "all",
      query: typedGql("query")({
        shops: {
          id: true,
          name: true,
        },
      }),
    });
  }
}
