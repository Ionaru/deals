import { inject, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs";

import { typedGql } from "../zeus/typedDocumentNode.js";

@Injectable({
  providedIn: "root",
})
export class HealthService {
  readonly #apollo = inject(Apollo);

  readonly services$ = this.#apollo
    .query({
      query: typedGql("query")({
        services: {
          id: true,
          name: true,
          queue: true,
          status: {
            uptime: true,
          },
          type: true,
        },
      }),
    })
    .pipe(map((result) => result.data.services));

  startScraper$(scraperName: string) {
    return this.#apollo.mutate({
      mutation: typedGql("mutation")({
        startScraper: [
          {
            name: scraperName,
          },
          true,
        ],
      }),
    });
  }
}
