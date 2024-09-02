import { MSMessage, type MSMPayload, type MSMResponse } from "@deals/api";
import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { SchedulerService } from "./scheduler.service";

@Controller()
export class SchedulerController {
  constructor(
    @Inject(SchedulerService)
    private readonly schedulerService: SchedulerService,
  ) {}

  @MessagePattern(MSMessage.GET_TASKS)
  async getTasks(
    _payload: MSMPayload<MSMessage.GET_TASKS>,
  ): Promise<MSMResponse<MSMessage.GET_TASKS>> {
    return this.schedulerService.getTasks();
  }

  @MessagePattern(MSMessage.GET_TASK)
  async getTask(
    payload: MSMPayload<MSMessage.GET_TASK>,
  ): Promise<MSMResponse<MSMessage.GET_TASK>> {
    return this.schedulerService.getTask(payload.name);
  }

  @MessagePattern(MSMessage.START_TASK)
  async startTask(
    payload: MSMPayload<MSMessage.START_TASK>,
  ): Promise<MSMResponse<MSMessage.START_TASK>> {
    return this.schedulerService.startTask(payload.name);
  }
}
