import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import * as session from "express-session";

import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (session.default as typeof session)({
      name: "My_session_cookie",
      resave: false,
      saveUninitialized: false,
      secret: "my-secret",
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

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
