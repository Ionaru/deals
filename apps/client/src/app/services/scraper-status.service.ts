import { inject, Injectable } from "@angular/core";

import { GatewayService } from "./gateway.service.js";

@Injectable({
  providedIn: "root",
})
export class ScraperStatusService {
  readonly #gateway = inject(GatewayService);

  getScraperStatus() {
    return this.#gateway.get("v1/scraper-status", {});
  }
}
