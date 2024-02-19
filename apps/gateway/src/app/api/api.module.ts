import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { DealsModule } from "./deals/deals.module";
import { HealthModule } from "./health/health.module";
import { ImagesController } from "./images/images.controller";
import { ScrapersModule } from "./scrapers/scrapers.module";
import { ShopsModule } from "./shops/shops.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [ImagesController],
  imports: [
    AuthModule,
    DealsModule,
    HealthModule,
    ScrapersModule,
    ShopsModule,
    TasksModule,
    UsersModule,
  ],
})
export class ApiModule {}
