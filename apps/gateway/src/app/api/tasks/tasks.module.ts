import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { TasksResolver } from "./tasks.resolver.js";
import { TasksService } from "./tasks.service.js";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [TasksService, TasksResolver],
})
export class TasksModule {}
