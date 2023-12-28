import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { ShopsResolver } from "./shops.resolver";
import { ShopsService } from "./shops.service";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [ShopsService, ShopsResolver],
})
export class ShopsModule {}
