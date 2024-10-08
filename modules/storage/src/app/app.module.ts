import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { Logger, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { StorageController } from "./app.controller";
import { Deal } from "./models/deal";
import { DealHistory } from "./models/deal-history";
import { PriceHistory } from "./models/price-history";
import { Product } from "./models/product";
import { Service } from "./models/service";
import { Shop } from "./models/shop";
import { UnknownDeal } from "./models/unknown-deal";
import { DealsService } from "./services/deals.service";
import { FoundDealsService } from "./services/found-deals.service";
import { ProductsService } from "./services/products.service";
import { ServicesService } from "./services/services.service";
import { ShopsService } from "./services/shops.service";
import { UnknownDealService } from "./services/unknown-deal.service";

@Module({
  controllers: [StorageController],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const sslEnabled =
          configService.getOrThrow("STORAGE_DB_SSL") === "true";

        if (sslEnabled) {
          Logger.log(
            "SSL is enabled for the database connection.",
            Storage.name,
          );
        } else {
          Logger.warn(
            "SSL is disabled for the database connection!",
            Storage.name,
          );
        }

        Logger.log(
          `Using database: ${configService.getOrThrow(
            "STORAGE_DB_HOST",
          )}:${configService.getOrThrow(
            "STORAGE_DB_PORT",
          )}/${configService.getOrThrow("STORAGE_DB_NAME")}`,
          Storage.name,
        );

        const getSSLConfiguration = () => ({
          ca: configService.getOrThrow("STORAGE_DB_CA"),
          cert: configService.getOrThrow("STORAGE_DB_CRT"),
          key: configService.getOrThrow("STORAGE_DB_KEY"),
          rejectUnauthorized: false,
        });

        return {
          database: configService.getOrThrow("STORAGE_DB_NAME"),
          entities: [
            Shop,
            Product,
            Deal,
            UnknownDeal,
            Service,
            PriceHistory,
            DealHistory,
          ],
          host: configService.getOrThrow("STORAGE_DB_HOST"),
          // logging: true,
          password: configService.getOrThrow("STORAGE_DB_PASS"),
          port: configService.getOrThrow("STORAGE_DB_PORT"),
          ssl: sslEnabled ? getSSLConfiguration() : false,
          synchronize:
            configService.getOrThrow("STORAGE_DB_SYNCHRONIZE") === "true",
          type: "mysql",
          username: configService.getOrThrow("STORAGE_DB_USER"),
        };
      },
    }),
    TypeOrmModule.forFeature([
      Shop,
      Product,
      Deal,
      UnknownDeal,
      Service,
      PriceHistory,
      DealHistory,
    ]),
    MicroserviceModule.forRoot("Storage", ServiceType.CORE, true),
  ],
  providers: [
    FoundDealsService,
    UnknownDealService,
    DealsService,
    ServicesService,
    ShopsService,
    ProductsService,
  ],
})
export class Storage implements OnApplicationShutdown {
  constructor(private dataSource: DataSource) {}

  onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      this.dataSource.destroy();
    }
  }
}
