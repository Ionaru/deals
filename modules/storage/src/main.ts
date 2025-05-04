import { natsOptions } from "@deals/api";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { Storage } from "./app/app.module.js";
import { ServicesService } from "./app/services/services.service.js";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Storage,
    natsOptions,
  );

  app.enableShutdownHooks();

  await app.listen();
  Logger.log(`🚀 Storage is running`);
  const servicesService = app.get(ServicesService);
  await servicesService.init();
};

bootstrap().catch((error) => {
  throw error;
});
