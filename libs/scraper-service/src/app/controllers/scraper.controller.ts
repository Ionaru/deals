import { ScraperStatus } from "@deals/api";
import { splitArrayIntoChunks } from "@ionaru/array-utils";
import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { ScrapeWebsiteService } from "../services/scrape-website.service.js";
import { StorageService } from "../services/storage.service.js";

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
            deals: chunk,
            firstBatch: chunk === dealChunks.at(0),
            lastBatch: chunk === dealChunks.at(-1),
            shop: this.scraper.shopName,
          });
        }

        if (dealChunks.length === 0) {
          await this.storage.store({
            deals: [],
            firstBatch: true,
            lastBatch: true,
            shop: this.scraper.shopName,
          });
        }

        this.status = ScraperStatus.IDLE;
      } catch (error) {
        this.status = ScraperStatus.ERROR;
        console.error(error);
        // TODO: send error to storage
      }
    }
  }

  return ScraperController;
};
