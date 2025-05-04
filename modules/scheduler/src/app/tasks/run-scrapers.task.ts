import { MSMessage, ServiceType } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { uniquifyArray } from "@ionaru/array-utils";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { combineLatest, map, switchMap } from "rxjs";

@Injectable()
export class RunScrapersTask {
  constructor(private readonly gateway: ServiceGatewayService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM, {
    name: RunScrapersTask.name,
    timeZone: "Europe/Amsterdam",
  })
  tick() {
    Logger.log(`Starting`, RunScrapersTask.name);
    this.gateway
      .send(MSMessage.GET_SERVICES, {})
      .pipe(
        map((services) =>
          services.filter((service) => service.type === ServiceType.SCRAPER),
        ),
        map((services) => services.map((service) => service.name)),
        map((services) => uniquifyArray(services)),
        map((services) =>
          services.map((name) => this.gateway.sendCommand(name)),
        ),
        switchMap((services) => combineLatest(services)),
      )
      .subscribe(() => {
        Logger.log(`Finished`, RunScrapersTask.name);
      });
  }
}
