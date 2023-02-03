import { DynamicModule, Module } from '@nestjs/common';

import { ScraperController } from './controllers/scraper.controller';
import { ScrapeWebsiteService } from './services/scrape-website.service';

@Module({
    controllers: [ScraperController],
    exports: [],
    imports: [],
    providers: [],
})
export class ScraperServiceModule {
    public static forRoot(scraper: new () => ScrapeWebsiteService): DynamicModule {
        return {
            exports: [],
            module: ScraperServiceModule,
            providers: [{ provide: 'SCRAPER', useClass: scraper }],
        };
    }
}
