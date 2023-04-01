import { Module } from '@nestjs/common';

import { DealsModule } from './api/deals/deals.module';
import { ScrapersModule } from './api/scrapers/scrapers.module';
import { ServiceRegistryModule } from '@deals/service-registry';
import { HealthModule } from './api/health/health.module';

@Module({
    imports: [
        DealsModule,
        ScrapersModule,
        HealthModule,
        ServiceRegistryModule.forRoot('Gateway'),
    ],
})
export class AppModule {}
