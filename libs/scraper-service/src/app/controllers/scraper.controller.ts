import { Controller, Get, Inject, Post } from '@nestjs/common';

import { ScrapeWebsiteService } from '../services/scrape-website.service';

enum ScraperStatus {
    IDLE = 'IDLE',
    SCRAPING = 'SCRAPING',
    ERROR = 'ERROR',
}

@Controller('')
export class ScraperController {
    private status = ScraperStatus.IDLE;

    public constructor(@Inject('SCRAPER') private readonly scraper: ScrapeWebsiteService) {}

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
            await this.scraper.scrape();
            this.status = ScraperStatus.IDLE;
            // TODO: send results to storage
        } catch (error) {
            this.status = ScraperStatus.ERROR;
            console.error(error);
            // TODO: send error to storage
        }
    }
}
