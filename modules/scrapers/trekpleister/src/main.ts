import { natsOptions } from "@deals/api";
import { ScraperServiceModule } from "@deals/scraper-service";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { Trekpleister } from "./trekpleister.js";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScraperServiceModule.forRoot(Trekpleister),
    natsOptions,
  );
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(`🚀 Microservice for ${Trekpleister.name} is running`);
};

bootstrap().catch((error) => {
  throw error;
});
