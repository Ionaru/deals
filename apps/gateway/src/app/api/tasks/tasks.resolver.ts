import { TaskDTO } from "@deals/api";
import { AuthGuard, Roles, Role } from "@deals/auth";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { TasksService } from "./tasks.service.js";

@Resolver()
@UseGuards(AuthGuard)
@Roles([Role.ADMIN])
export class TasksResolver {
  constructor(private readonly schedulerService: TasksService) {}

  @Query(() => [TaskDTO])
  tasks(): Observable<TaskDTO[]> {
    return this.schedulerService.getTasks();
  }

  @Query(() => TaskDTO, { nullable: true })
  task(@Args("name", { type: () => String }) name: string) {
    return this.schedulerService.getTask(name);
  }

  @Mutation(() => Boolean)
  startTask(@Args("name", { type: () => String }) name: string) {
    return this.schedulerService.startTask(name);
  }
}
