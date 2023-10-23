import { natsOptions } from "@deals/api";
import { ScraperServiceModule } from "@deals/scraper-service";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { Jumbo } from "./jumbo";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScraperServiceModule.forRoot(Jumbo),
    natsOptions,
  );
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(`🚀 Microservice for ${Jumbo.name} is running`);
};

bootstrap();
