import { natsOptions } from "@deals/api";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";

import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    natsOptions,
  );

  app.enableShutdownHooks();

  await app.listen();
  Logger.log(`🚀 Scheduler is running`);
};

bootstrap().catch((error) => {
  throw error;
});
