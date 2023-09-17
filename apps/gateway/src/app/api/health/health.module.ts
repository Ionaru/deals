import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';
import { HealthResolver } from './health.resolver';
import { HealthService } from './health.service';

@Module({
    controllers: [HealthController],
    imports: [MicroserviceModule],
    providers: [HealthService, HealthResolver],
})
export class HealthModule {}
