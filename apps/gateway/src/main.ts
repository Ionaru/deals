import { natsOptions } from "@deals/api";
import { ServicesService } from "@deals/storage";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { Gateway } from "./app/app.module.js";

const bootstrap = async () => {
  const app = await NestFactory.create(Gateway);

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  const port = process.env["PORT"] ?? 3333;
  await app.listen(port);
  Logger.log(`🚀 Gateway is running on: http://localhost:${port}/graphql`);

  app.connectMicroservice(natsOptions);
  await app.startAllMicroservices();

  const servicesService = app.get(ServicesService);
  await servicesService.init();
};

bootstrap().catch((error) => {
  throw error;
});
