import { ScraperStatus } from '@deals/api';
import { Controller, Get, Inject, Post } from '@nestjs/common';

import { ScrapeWebsiteService } from '../services/scrape-website.service';
import { StorageService } from '../services/storage.service';

@Controller('')
export class ScraperController {
    private status = ScraperStatus.IDLE;

    public constructor(
        @Inject('SCRAPER') private readonly scraper: ScrapeWebsiteService,
        private readonly storage: StorageService,
    ) {}

    @Get()
    public getStatus() {
        return { status: this.status };
    }

    @Post()
    public async scrape() {
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
