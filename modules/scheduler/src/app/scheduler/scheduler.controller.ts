import { MSMessage, type MSMPayload, type MSMResponse } from "@deals/api";
import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { SchedulerService } from "./scheduler.service.js";

@Controller()
export class SchedulerController {
  constructor(
    @Inject(SchedulerService)
    private readonly schedulerService: SchedulerService,
  ) {}

  @MessagePattern(MSMessage.GET_TASKS)
  getTasks(
    _payload: MSMPayload<MSMessage.GET_TASKS>,
  ): MSMResponse<MSMessage.GET_TASKS> {
    return this.schedulerService.getTasks();
  }

  @MessagePattern(MSMessage.GET_TASK)
  getTask(
    payload: MSMPayload<MSMessage.GET_TASK>,
  ): MSMResponse<MSMessage.GET_TASK> {
    return this.schedulerService.getTask(payload.name);
  }

  @MessagePattern(MSMessage.START_TASK)
  startTask(
    payload: MSMPayload<MSMessage.START_TASK>,
  ): MSMResponse<MSMessage.START_TASK> {
    return this.schedulerService.startTask(payload.name);
  }
}
