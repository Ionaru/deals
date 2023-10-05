import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {},
      transport: Transport.NATS,
    },
  );

  await app.listen();
  Logger.log(`🚀 Auth is running`);
};

bootstrap().catch((error) => {
  Logger.error(error);
});
