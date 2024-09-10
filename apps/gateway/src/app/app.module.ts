import { ServiceType } from "@deals/api";
import { Auth } from "@deals/auth";
import { Scheduler } from "@deals/scheduler";
import { ScraperServiceModule } from "@deals/scraper-service";
import { AlbertHeijnScraper } from "@deals/scrapers/ah";
import { JumboScraper } from "@deals/scrapers/jumbo";
import { KruidvatScraper } from "@deals/scrapers/kruidvat";
import { MicroserviceModule } from "@deals/service-registry";
import { Storage } from "@deals/storage";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import mongo from "connect-mongo";
import { NestSessionOptions, SessionModule } from "nestjs-session";

import { ApiModule } from "./api/api.module";
import { ServiceUnavailableFilter } from "./exception-filters/service-unavailable.filter";

let sessionStore: mongo | undefined;

@Module({
  imports: [
    ConfigModule,
    SessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<NestSessionOptions> => {
        sessionStore = mongo.create({
          dbName: config.getOrThrow("SESSION_DB_NAME"),
          mongoUrl: config.getOrThrow("AUTH_DB_URL"),
        });
        return {
          session: {
            name: config.getOrThrow("GATEWAY_SESSION_NAME"),
            resave: false,
            saveUninitialized: false,
            secret: config.getOrThrow("GATEWAY_SESSION_SECRET"),
            store: sessionStore,
          },
        };
      },
    }),
    MicroserviceModule.forRoot("Gateway", ServiceType.CORE),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: { path: "schema.graphql" },
      context: ({ res }: any) => ({ res }),
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
    Auth,
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
export class Gateway implements OnApplicationShutdown {
  onApplicationShutdown() {
    sessionStore?.close();
  }
}
