import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

@Module({
    controllers: [DealsController],
    imports: [MicroserviceModule],
    providers: [DealsService],
})
export class DealsModule {}
