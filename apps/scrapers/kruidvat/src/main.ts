import { natsOptions } from "@deals/api";
import { ScraperServiceModule } from "@deals/scraper-service";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { Kruidvat } from "./kruidvat";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScraperServiceModule.forRoot(Kruidvat),
    natsOptions,
  );
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(`🚀 Microservice for ${Kruidvat.name} is running`);
};

bootstrap();
