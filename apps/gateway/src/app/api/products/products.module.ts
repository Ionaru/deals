import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { ProductsResolver } from "./products.resolver.js";
import { ProductsService } from "./products.service.js";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
