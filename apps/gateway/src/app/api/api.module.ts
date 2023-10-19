import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { DealsModule } from "./deals/deals.module";
import { HealthModule } from "./health/health.module";
import { ScrapersModule } from "./scrapers/scrapers.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [AuthModule, DealsModule, HealthModule, ScrapersModule, UsersModule],
})
export class ApiModule {}
