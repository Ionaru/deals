import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { DealsModule } from './api/deals/deals.module';
import { HealthModule } from './api/health/health.module';
import { ScrapersModule } from './api/scrapers/scrapers.module';
import { ServiceType } from '@deals/api';

@Module({
    imports: [
        DealsModule,
        ScrapersModule,
        HealthModule,
        MicroserviceModule.forRoot('Gateway', ServiceType.CORE),
    ],
})
export class AppModule {}
