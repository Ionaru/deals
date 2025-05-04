import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { SchedulerModule } from "./scheduler/scheduler.module.js";
import { RunScrapersTask } from "./tasks/run-scrapers.task.js";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SchedulerModule,
    MicroserviceModule.forRoot("Scheduler", ServiceType.CORE),
  ],
  providers: [RunScrapersTask],
})
export class Scheduler {}
