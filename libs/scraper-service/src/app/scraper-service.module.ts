import { service } from '@deals/api';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ScraperController } from './controllers/scraper.controller';
import { ScrapeWebsiteService } from './services/scrape-website.service';
import { StorageService } from './services/storage.service';

@Module({
    controllers: [ScraperController],
    exports: [],
    imports: [
        ClientsModule.register([
            { name: service.STORAGE, transport: Transport.TCP },
        ]),
    ],
    providers: [StorageService],
})
export class ScraperServiceModule {
    public static forRoot(
        scraper: new () => ScrapeWebsiteService,
    ): DynamicModule {
        return {
            exports: [],
            module: ScraperServiceModule,
            providers: [{ provide: 'SCRAPER', useClass: scraper }],
        };
    }
}
