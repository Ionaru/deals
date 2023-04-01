// import { randomUUID } from 'node:crypto';

import { network } from '@deals/api';
import { ServiceRegistryModule } from '@deals/service-registry';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { Deal } from './models/deal';
import { Product } from './models/product';
import { Service } from './models/service';
import { Shop } from './models/shop';
import { UnknownDeal } from './models/unknown-deal';
import { DealsService } from './services/deals.service';
import { FoundDealsService } from './services/found-deals.service';
import { ServicesService } from './services/services.service';
import { UnknownDealService } from './services/unknown-deal.service';

@Module({
    controllers: [AppController],
    imports: [
        ClientsModule.register([
            {
                name: network.PRIMARY,
                options: {},
                transport: Transport.NATS,
            },
        ]),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const sslEnabled =
                    configService.getOrThrow('STORAGE_DB_SSL') === 'true';

                if (sslEnabled) {
                    Logger.log(
                        'SSL is enabled for the database connection.',
                        AppModule.name,
                    );
                } else {
                    Logger.warn(
                        'SSL is disabled for the database connection!',
                        AppModule.name,
                    );
                }

                Logger.log(
                    `Using database: ${configService.getOrThrow(
                        'STORAGE_DB_HOST',
                    )}:${configService.getOrThrow(
                        'STORAGE_DB_PORT',
                    )}/${configService.getOrThrow('STORAGE_DB_NAME')}`,
                    AppModule.name,
                );

                const getSSLConfiguration = () => ({
                    ca: configService.getOrThrow('STORAGE_DB_CA'),
                    cert: configService.getOrThrow('STORAGE_DB_CRT'),
                    key: configService.getOrThrow('STORAGE_DB_KEY'),
                    rejectUnauthorized: true,
                });

                return {
                    database: configService.getOrThrow('STORAGE_DB_NAME'),
                    entities: [Shop, Product, Deal, UnknownDeal, Service],
                    host: configService.getOrThrow('STORAGE_DB_HOST'),
                    // logging: true,
                    password: configService.getOrThrow('STORAGE_DB_PASS'),
                    port: configService.getOrThrow('STORAGE_DB_PORT'),
                    ssl: sslEnabled ? getSSLConfiguration() : false,
                    synchronize: true,
                    type: 'mysql',
                    username: configService.getOrThrow('STORAGE_DB_USER'),
                };
            },
        }),
        TypeOrmModule.forFeature([Shop, Product, Deal, UnknownDeal, Service]),
        ServiceRegistryModule.forRoot('Storage', true),
    ],
    providers: [FoundDealsService, UnknownDealService, DealsService, ServicesService],
})
export class AppModule implements OnModuleInit {

    public constructor(
        // private readonly servicesService: ServicesService,
    ) {}

    public async onModuleInit() {
        // await this.servicesService.init();
        // await this.servicesService.registerService('Storage', randomUUID());
    }

}
