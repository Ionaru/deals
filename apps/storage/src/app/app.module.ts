import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { Deal } from './models/deal';
import { Product } from './models/product';
import { Shop } from './models/shop';
import { UnknownDeal } from './models/unknown-deal';
import { FoundDealsService } from './services/found-deals.service';
import { UnknownDealService } from './services/unknown-deal.service';

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const sslEnabled =
                    configService.getOrThrow('STORAGE_DB_SSL') === 'true';

                if (!sslEnabled) {
                    Logger.warn(
                        'SSL is disabled for the database connection!',
                        AppModule.name,
                    );
                } else {
                    Logger.log(
                        'SSL is enabled for the database connection.',
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
                    entities: [Shop, Product, Deal, UnknownDeal],
                    host: configService.getOrThrow('STORAGE_DB_HOST'),
                    logging: true,
                    password: configService.getOrThrow('STORAGE_DB_PASS'),
                    port: configService.getOrThrow('STORAGE_DB_PORT'),
                    ssl: sslEnabled ? getSSLConfiguration() : false,
                    synchronize: true,
                    type: 'mysql',
                    username: configService.getOrThrow('STORAGE_DB_USER'),
                };
            },
        }),
        TypeOrmModule.forFeature([Shop, Product, Deal, UnknownDeal]),
    ],
    providers: [FoundDealsService, UnknownDealService],
})
export class AppModule {}
