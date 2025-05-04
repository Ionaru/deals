import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { SchedulerController } from "./scheduler.controller.js";
import { SchedulerService } from "./scheduler.service.js";

@Module({
  controllers: [SchedulerController],
  imports: [MicroserviceModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
