import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { AuthModule } from "./api/auth/auth.module";
import { DealsModule } from "./api/deals/deals.module";
import { HealthModule } from "./api/health/health.module";
import { ScrapersModule } from "./api/scrapers/scrapers.module";
import { UsersModule } from "./api/users/users.module";
import { ServiceUnavailableFilter } from "./exception-filters/service-unavailable.filter";

@Module({
  imports: [
    AuthModule,
    DealsModule,
    ScrapersModule,
    HealthModule,
    UsersModule,
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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceUnavailableFilter,
    },
  ],
})
export class AppModule {}
