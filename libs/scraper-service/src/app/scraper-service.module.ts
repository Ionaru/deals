import { network } from '@deals/api';
import { ServiceRegistryModule } from '@deals/service-registry';
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
            {
                name: network.PRIMARY,
                options: {},
                transport: Transport.NATS,
            },
        ]),
    ],
    providers: [StorageService],
})
export class ScraperServiceModule {
    public static forRoot(
        scraper: new (storage: StorageService) => ScrapeWebsiteService,
    ): DynamicModule {
        return {
            exports: [],
            imports: [ServiceRegistryModule.forRoot(scraper.name)],
            module: ScraperServiceModule,
            providers: [
                { provide: 'SCRAPER', useClass: scraper },
                { provide: 'NAME', useValue: scraper.name },
            ],
        };
    }
}
