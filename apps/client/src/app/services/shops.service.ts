import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";

import { typedGql } from "../zeus/typedDocumentNode.js";

export const shopsQuery = typedGql("query")({
  shops: {
    id: true,
    name: true,
  },
});

@Injectable({
  providedIn: "root",
})
export class ShopsService {
  readonly #apollo = inject(Apollo);

  shops$ = this.#apollo.query({
    errorPolicy: "all",
    query: shopsQuery,
  });
}
