import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { DealsModule } from "./deals/deals.module";
import { HealthModule } from "./health/health.module";
import { ProductsModule } from "./products/products.module";
import { ScrapersModule } from "./scrapers/scrapers.module";
import { ShopsModule } from "./shops/shops.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AuthModule,
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
