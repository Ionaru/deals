import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { ScrapersResolver } from './scrapers.resolver';
import { ScrapersService } from './scrapers.service';

@Module({
    controllers: [],
    imports: [MicroserviceModule],
    providers: [ScrapersService, ScrapersResolver],
})
export class ScrapersModule {}
