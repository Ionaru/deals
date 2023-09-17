import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';

import { ScrapersController } from './scrapers.controller';
import { ScrapersResolver } from './scrapers.resolver';
import { ScrapersService } from './scrapers.service';

@Module({
    controllers: [ScrapersController],
    imports: [MicroserviceModule],
    providers: [ScrapersService, ScrapersResolver],
})
export class ScrapersModule {}
