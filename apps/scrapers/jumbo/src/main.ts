import { ScraperServiceModule } from '@deals/scraper-service';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Jumbo } from './jumbo';

const bootstrap = async () => {
    const app = await NestFactory.create(ScraperServiceModule.forRoot(Jumbo));
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env['PORT'] || 3333;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
};

bootstrap();
