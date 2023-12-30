import { ScraperStatus } from "@deals/api";
import { splitArrayIntoChunks } from "@ionaru/array-utils";
import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { ScrapeWebsiteService } from "../services/scrape-website.service";
import { StorageService } from "../services/storage.service";

export const createScraperController = (name: string) => {
  @Controller()
  class ScraperController {
    status = ScraperStatus.IDLE;

    constructor(
      @Inject("SCRAPER") readonly scraper: ScrapeWebsiteService,
      readonly storage: StorageService,
    ) {}

    @MessagePattern(name)
    async handleDirectMessage() {
      if (this.status === ScraperStatus.SCRAPING) {
        return;
      }

      this.status = ScraperStatus.SCRAPING;
      try {
        const result = await this.scraper.scrape();
        const dealChunks = splitArrayIntoChunks(result, 500);
        for (const chunk of dealChunks) {
          await this.storage.store({
            clear: chunk === dealChunks[0],
            deals: chunk,
            shop: this.scraper.shopName,
          });
        }
        this.status = ScraperStatus.IDLE;
      } catch (error) {
        this.status = ScraperStatus.ERROR;
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: send error to storage
      }
    }
  }

  return ScraperController;
};
