import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { SchedulerController } from "./scheduler.controller";
import { SchedulerService } from "./scheduler.service";

@Module({
  controllers: [SchedulerController],
  imports: [MicroserviceModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
