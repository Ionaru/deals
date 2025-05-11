import { Module } from "@nestjs/common";

import { DealsModule } from "./deals/deals.module.js";
import { HealthModule } from "./health/health.module.js";
import { ProductsModule } from "./products/products.module.js";
import { ScrapersModule } from "./scrapers/scrapers.module.js";
import { ShopsModule } from "./shops/shops.module.js";
import { TasksModule } from "./tasks/tasks.module.js";
import { UsersModule } from "./users/users.module.js";

@Module({
  imports: [
    DealsModule,
    ProductsModule,
    HealthModule,
    ScrapersModule,
    ShopsModule,
    TasksModule,
    UsersModule,
  ],
})
export class ApiModule {}
