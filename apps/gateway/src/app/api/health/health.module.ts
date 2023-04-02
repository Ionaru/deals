import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
    controllers: [HealthController],
    imports: [MicroserviceModule],
    providers: [HealthService],
})
export class HealthModule {}
