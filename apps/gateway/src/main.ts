import { natsOptions } from "@deals/api";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  const port = process.env["PORT"] || 3333;
  await app.listen(port);
  Logger.log(`🚀 Gateway is running on: http://localhost:${port}/graphql`);

  app.connectMicroservice(natsOptions);
  await app.startAllMicroservices();
};

bootstrap().catch((error) => {
  throw error;
});
