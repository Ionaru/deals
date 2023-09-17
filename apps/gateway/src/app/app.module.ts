import { ServiceType } from '@deals/api';
import { MicroserviceModule } from '@deals/service-registry';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DealsModule } from './api/deals/deals.module';
import { HealthModule } from './api/health/health.module';
import { ScrapersModule } from './api/scrapers/scrapers.module';

@Module({
    imports: [
        DealsModule,
        ScrapersModule,
        HealthModule,
        MicroserviceModule.forRoot('Gateway', ServiceType.CORE),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
            sortSchema: true,
        }),
    ],
})
export class AppModule {}
