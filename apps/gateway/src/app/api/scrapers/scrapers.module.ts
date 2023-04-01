import { network } from '@deals/api';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ScrapersController } from './scrapers.controller';
import { ScrapersService } from './scrapers.service';

@Module({
    controllers: [ScrapersController],
    imports: [
        ClientsModule.register([
            { name: network.PRIMARY, options: {}, transport: Transport.NATS },
        ]),
    ],
    providers: [ScrapersService],
})
export class ScrapersModule {}
