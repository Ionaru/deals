import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { DealsResolver } from './deals.resolver';
import { DealsService } from './deals.service';

@Module({
    controllers: [],
    imports: [MicroserviceModule],
    providers: [DealsService, DealsResolver],
})
export class DealsModule {}
