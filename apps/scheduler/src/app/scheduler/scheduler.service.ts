import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class SchedulerService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  getTasks() {
    const tasks = this.schedulerRegistry.getCronJobs();
    return [...tasks.entries()].map((entry) => this.#mapCronJob(entry));
  }

  getTask(name: string) {
    try {
      const tasks = this.schedulerRegistry.getCronJob(name);
      return this.#mapCronJob([name, tasks]);
    } catch {
      return null;
    }
  }

  startTask(name: string) {
    try {
      const tasks = this.schedulerRegistry.getCronJob(name);
      tasks.fireOnTick();
      return true;
    } catch {
      return false;
    }
  }

  #mapCronJob([name, task]: [string, CronJob]) {
    return {
      lastRun: task.lastDate()?.toString(),
      name,
      nextRun: task.nextDate().toString(),
    };
  }
}
