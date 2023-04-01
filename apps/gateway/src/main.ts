import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI,
    });
    const port = process.env['PORT'] || 3333;
    await app.listen(port);
    Logger.log(
        `🚀 Gateway is running on: http://localhost:${port}/${globalPrefix}`,
    );

    app.connectMicroservice({
        options: {},
        transport: Transport.NATS,
    });
    await app.startAllMicroservices();
};

bootstrap();
