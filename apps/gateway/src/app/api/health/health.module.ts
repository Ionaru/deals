import { network } from '@deals/api';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
    controllers: [HealthController],
    imports: [
        ClientsModule.register([
            { name: network.PRIMARY, options: {}, transport: Transport.NATS },
        ]),
    ],
    providers: [HealthService],
})
export class HealthModule {}
