import { ScraperStatus } from '@deals/api';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ScrapeWebsiteService } from '../services/scrape-website.service';
import { StorageService } from '../services/storage.service';

export const createScraperController = (name: string) => {

    @Controller()
    class ScraperController {

        status = ScraperStatus.IDLE;

        public constructor(
            @Inject('SCRAPER') readonly scraper: ScrapeWebsiteService,
            readonly storage: StorageService,
        ) {}

        @MessagePattern(name)
        public async handleDirectMessage() {
            if (this.status === ScraperStatus.SCRAPING) {
                return;
            }

            this.status = ScraperStatus.SCRAPING;
            try {
                const result = await this.scraper.scrape();
                await this.storage.store({
                    deals: result,
                    shop: this.scraper.shopName,
                });
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
