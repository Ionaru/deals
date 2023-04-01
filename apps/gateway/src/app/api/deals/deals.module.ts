import { network } from '@deals/api';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

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
