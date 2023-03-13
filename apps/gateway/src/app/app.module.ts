import { service } from '@deals/api';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    controllers: [AppController],
    imports: [
        ClientsModule.register([
            { name: service.STORAGE, transport: Transport.TCP },
            { name: 'SCRAPER', transport: Transport.TCP },
        ]),
    ],
    providers: [AppService],
})
export class AppModule {}
