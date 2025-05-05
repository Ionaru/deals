import { natsOptions } from "@deals/api";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { Scheduler } from "./app/app.module.js";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Scheduler,
    natsOptions,
  );

  app.enableShutdownHooks();

  await app.listen();
  Logger.log(`🚀 Scheduler is running`);
};

bootstrap().catch((error) => {
  throw error;
});
