import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { Logger, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { StorageController } from "./app.controller.js";
import { DealHistory } from "./models/deal-history.js";
import { Deal } from "./models/deal.js";
import { PriceHistory } from "./models/price-history.js";
import { Product } from "./models/product.js";
import { Service } from "./models/service.js";
import { Shop } from "./models/shop.js";
import { UnknownDeal } from "./models/unknown-deal.js";
import { DealsService } from "./services/deals.service.js";
import { FoundDealsService } from "./services/found-deals.service.js";
import { ProductsService } from "./services/products.service.js";
import { ServicesService } from "./services/services.service.js";
import { ShopsService } from "./services/shops.service.js";
import { UnknownDealService } from "./services/unknown-deal.service.js";

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

        const getSSLConfiguration = () => {
          const rejectUnauthorized = configService.get<string>("STORAGE_DB_REJECT_UNAUTHORIZED", "true") === "true";
          
          if (!rejectUnauthorized) {
            Logger.warn(
              "SSL certificate validation is disabled! This should only be used in development environments.",
              Storage.name,
            );
          }

          return {
            ca: configService.getOrThrow<string>("STORAGE_DB_CA"),
            cert: configService.getOrThrow<string>("STORAGE_DB_CRT"),
            key: configService.getOrThrow<string>("STORAGE_DB_KEY"),
            rejectUnauthorized,
          };
        };

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
          logging: ["error", "info", "log", "migration", "schema", "warn"],
          password: configService.getOrThrow("STORAGE_DB_PASS"),
          port: configService.getOrThrow("STORAGE_DB_PORT"),
          ssl: sslEnabled ? getSSLConfiguration() : false,
          synchronize: configService.getOrThrow<boolean>(
            "STORAGE_DB_SYNCHRONIZE",
          ),
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
  constructor(private readonly dataSource: DataSource) {}

  onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      void this.dataSource.destroy();
    }
  }
}
