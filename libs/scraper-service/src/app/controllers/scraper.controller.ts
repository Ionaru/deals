import { IMSPayload, MSMessage } from '@deals/api';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ScraperController {
    // private status = ScraperStatus.IDLE;

    // public constructor(
    //     @Inject('SCRAPER') private readonly scraper: ScrapeWebsiteService,
    //     private readonly storage: StorageService,
    // ) {}

    // @Get()
    // public getStatus() {
    //     return { status: this.status };
    // }
    //
    // @Post()
    // public async scrape() {
    //     if (this.status === ScraperStatus.SCRAPING) {
    //         return;
    //     }
    //
    //     this.status = ScraperStatus.SCRAPING;
    //     try {
    //         const result = await this.scraper.scrape();
    //         await this.storage.store({
    //             deals: result,
    //             shop: this.scraper.shopName,
    //         });
    //         this.status = ScraperStatus.IDLE;
    //     } catch (error) {
    //         this.status = ScraperStatus.ERROR;
    //         // eslint-disable-next-line no-console
    //         console.error(error);
    //         // TODO: send error to storage
    //     }
    // }

    @MessagePattern(MSMessage.GET_HEALTH)
    public handleGetDeals(): IMSPayload[MSMessage.GET_HEALTH] {
        return { status: 'ok' };
    }
}
