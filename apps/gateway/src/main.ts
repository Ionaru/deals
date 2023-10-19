import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import MongoStore from "connect-mongo";
import session from "express-session";

import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(
    session({
      name: configService.getOrThrow("GATEWAY_SESSION_NAME"),
      resave: false,
      saveUninitialized: false,
      secret: configService.getOrThrow("GATEWAY_SESSION_SECRET"),
      store: MongoStore.create({
        dbName: "Deals-Session",
        mongoUrl: configService.getOrThrow("AUTH_DB_URL"),
      }),
    }),
  );

  const port = process.env["PORT"] || 3333;
  await app.listen(port);
  Logger.log(`🚀 Gateway is running on: http://localhost:${port}/graphql`);

  app.connectMicroservice({
    options: {},
    transport: Transport.NATS,
  });
  await app.startAllMicroservices();
};

bootstrap();
