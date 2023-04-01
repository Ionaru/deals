import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { ServicesService } from './app/services/services.service';

const bootstrap = async () => {
    // const app2 = await NestFactory.create(AppModule);


    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            options: {},
            transport: Transport.NATS,
        },
    );

    // app2.connectMicroservice({
    //     options: {},
    //     transport: Transport.NATS,
    // });
    //
    // app2.connectMicroservice({
    //     options: {},
    //     transport: Transport.NATS,
    // });

    // await app2.startAllMicroservices();
    await app.listen();
    Logger.log(`🚀 Storage is running`);
    const servicesService = app.get(ServicesService);
    await servicesService.init();
};

bootstrap().catch((error) => {
    Logger.error(error);
});
