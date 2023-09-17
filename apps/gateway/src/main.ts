import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

import { APITag } from './app/api-tag';
import { AppModule } from './app/app.module';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI,
    });

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Deals Gateway API')
        .setDescription('API documentation for the Deals application')
        .setVersion('0.1')
        .addTag(APITag.DEALS)
        .addTag(APITag.HEALTH)
        .addTag(APITag.DEALS)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme('v3');
    const options = theme.getDefaultConfig('dark');
    SwaggerModule.setup('api', app, document, options);

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
