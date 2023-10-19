import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { ApiModule } from "./api/api.module";
import { ServiceUnavailableFilter } from "./exception-filters/service-unavailable.filter";

@Module({
  imports: [
    ConfigModule,
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
export class AppModule {}
