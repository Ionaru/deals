import { ServiceType } from '@deals/api';
import { MicroserviceModule } from '@deals/service-registry';
import { DynamicModule, Module } from '@nestjs/common';

import { ScraperController } from './controllers/scraper.controller';
import { ScrapeWebsiteService } from './services/scrape-website.service';
import { StorageService } from './services/storage.service';

@Module({
    controllers: [ScraperController],
    exports: [],
    imports: [],
    providers: [StorageService],
})
export class ScraperServiceModule {
    public static forRoot(
        scraper: new (storage: StorageService) => ScrapeWebsiteService,
    ): DynamicModule {
        return {
            exports: [],
            imports: [MicroserviceModule.forRoot(scraper.name, ServiceType.SCRAPER)],
            module: ScraperServiceModule,
            providers: [
                { provide: 'SCRAPER', useClass: scraper },
                { provide: 'NAME', useValue: scraper.name },
            ],
        };
    }
}
