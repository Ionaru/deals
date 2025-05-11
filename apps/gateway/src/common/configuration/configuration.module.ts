import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
  PORT: Joi.number().port().default(3333),
  AUTH_COOKIE_EXPIRY: Joi.number().default(30),
  AUTH_COOKIE_NAME: Joi.string().required(),
  AUTH_DB_NAME: Joi.string().required(),
  AUTH_DB_URL: Joi.string().required(),
  AUTH_JWT_SECRET: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),
  STORAGE_DB_HOST: Joi.string().required(),
  STORAGE_DB_NAME: Joi.string().required(),
  STORAGE_DB_PASS: Joi.string().required(),
  STORAGE_DB_PORT: Joi.number().required(),
  STORAGE_DB_SSL: Joi.boolean().required(),
  STORAGE_DB_SYNCHRONIZE: Joi.boolean().required(),
  STORAGE_DB_USER: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
