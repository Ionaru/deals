import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getTasks() {
    return this.gateway.send(MSMessage.GET_TASKS, {});
  }

  getTask(name: string) {
    return this.gateway.send(MSMessage.GET_TASK, { name });
  }

  startTask(name: string) {
    return this.gateway.send(MSMessage.START_TASK, { name });
  }
}
