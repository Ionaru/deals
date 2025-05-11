import { ServiceType } from "@deals/api";
import { AuthModule } from "@deals/auth";
import { Scheduler } from "@deals/scheduler";
import { ScraperServiceModule } from "@deals/scraper-service";
import { AlbertHeijnScraper } from "@deals/scrapers/ah";
import { JumboScraper } from "@deals/scrapers/jumbo";
import { KruidvatScraper } from "@deals/scrapers/kruidvat";
import { MicroserviceModule } from "@deals/service-registry";
import { Storage } from "@deals/storage";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { ConfigurationModule } from "../common/configuration/configuration.module.js";

import { ApiModule } from "./api/api.module.js";
import { ServiceUnavailableFilter } from "./exception-filters/service-unavailable.filter.js";

@Module({
  imports: [
    ConfigurationModule,
    MicroserviceModule.forRoot("Gateway", ServiceType.CORE),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: { path: "schema.graphql" },
      context: ({ res }: { res: Response }) => ({ res }),
      driver: ApolloDriver,
      introspection: true,
      playground: {
        settings: {
          "request.credentials": "include",
        },
        title: "Deals API",
      },
      sortSchema: true,
    }),
    Storage,
    AuthModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("AUTH_JWT_SECRET"),
        databaseName: configService.getOrThrow<string>("AUTH_DB_NAME"),
        databaseUrl: configService.getOrThrow<string>("AUTH_DB_URL"),
        cookieName: configService.getOrThrow<string>("AUTH_COOKIE_NAME"),
        cookieExpiry: configService.getOrThrow<number>("AUTH_COOKIE_EXPIRY"),
        isProduction:
          configService.getOrThrow<string>("NODE_ENV") === "production",
      }),
    }),
    ApiModule,

    ScraperServiceModule.forRoot(AlbertHeijnScraper),
    ScraperServiceModule.forRoot(JumboScraper),
    ScraperServiceModule.forRoot(KruidvatScraper),
    Scheduler,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceUnavailableFilter,
    },
  ],
})
export class Gateway {}
