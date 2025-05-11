import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs";

import { $ } from "../zeus/index.js";
import { typedGql } from "../zeus/typedDocumentNode.js";

export const healthQuery = typedGql("query")({
  services: {
    id: true,
    name: true,
    queue: true,
    status: {
      uptime: true,
    },
    type: true,
  },
});

export const startScraperMutation = typedGql("mutation")({
  startScraper: [
    {
      name: $("name", "String!"),
    },
    true,
  ],
});

@Injectable({
  providedIn: "root",
})
export class HealthService {
  readonly #apollo = inject(Apollo);

  readonly services$ = this.#apollo
    .query({
      query: healthQuery,
    })
    .pipe(map((result) => result.data.services));

  startScraper$(scraperName: string) {
    return this.#apollo.mutate({
      mutation: startScraperMutation,
      variables: {
        name: scraperName,
      },
    });
  }
}
