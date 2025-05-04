import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { HealthResolver } from "./health.resolver.js";
import { HealthService } from "./health.service.js";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [HealthService, HealthResolver],
})
export class HealthModule {}
