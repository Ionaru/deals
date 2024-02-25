import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { ProductsResolver } from "./products.resolver";
import { ProductsService } from "./products.service";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
