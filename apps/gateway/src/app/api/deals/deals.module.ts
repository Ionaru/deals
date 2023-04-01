import { network } from '@deals/api';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';

@Module({
    controllers: [DealsController],
    imports: [
        ClientsModule.register([
            { name: network.PRIMARY, options: {}, transport: Transport.NATS },
        ]),
    ],
    providers: [DealsService],
})
export class DealsModule {}
