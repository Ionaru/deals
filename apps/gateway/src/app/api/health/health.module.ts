import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { HealthResolver } from './health.resolver';
import { HealthService } from './health.service';

@Module({
    controllers: [],
    imports: [MicroserviceModule],
    providers: [HealthService, HealthResolver],
})
export class HealthModule {}
