import { natsOptions } from "@deals/api";
import { ServicesService } from "@deals/storage";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { Gateway } from "./app/app.module.js";

const bootstrap = async () => {
  const app = await NestFactory.create(Gateway);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser(config.getOrThrow<string>("COOKIE_SECRET")));

  app.enableShutdownHooks();

  const port = config.getOrThrow<number>("PORT");
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
