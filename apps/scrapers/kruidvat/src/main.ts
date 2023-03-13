import { ScraperServiceModule } from '@deals/scraper-service';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { Kruidvat } from './kruidvat';

const bootstrap = async () => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ScraperServiceModule.forRoot(Kruidvat),
        {
            options: {
                port: 3001,
            },
            transport: Transport.TCP,
        },
    );
    await app.listen();
    Logger.log(`🚀 Microservice is running`);
};

bootstrap();
