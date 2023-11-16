import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import MongoStore from "connect-mongo";
import { NestSessionOptions, SessionModule } from "nestjs-session";

import { ApiModule } from "./api/api.module";
import { ServiceUnavailableFilter } from "./exception-filters/service-unavailable.filter";

let sessionStore: MongoStore | undefined;

@Module({
  imports: [
    ConfigModule,
    SessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<NestSessionOptions> => {
        sessionStore = MongoStore.create({
          dbName: "Deals-Session",
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
      playground: {
        settings: {
          "request.credentials": "include",
        },
        title: "Deals API",
      },
      sortSchema: true,
    }),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceUnavailableFilter,
    },
  ],
})
export class AppModule implements OnApplicationShutdown {
  onApplicationShutdown() {
    sessionStore?.close();
  }
}
