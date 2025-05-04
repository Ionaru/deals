import { MSEvent, ServiceType } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, firstValueFrom, map, of, zip } from "rxjs";
import { Repository } from "typeorm";

import { Service } from "../models/service.js";

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly gateway: ServiceGatewayService,
  ) {}

  async init(): Promise<void> {
    await this.serviceRepository.clear();
    this.gateway.emit(MSEvent.REPORT_SERVICE, {});
  }

  async registerService(
    name: string,
    queue: string,
    type: ServiceType,
  ): Promise<Service> {
    const service = new Service();
    service.name = name;
    service.queue = queue;
    service.type = type;
    await this.serviceRepository.upsert(service, ["queue"]);
    return service;
  }

  async unregisterService(queue: string): Promise<void> {
    await this.serviceRepository.delete({ queue });
  }

  async getService(id: string) {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      return service;
    }

    return firstValueFrom(
      this.gateway.sendDirect(service.queue, {}).pipe(
        catchError((error) => {
          if (
            error instanceof Error &&
            error.message.includes(
              "There are no subscribers listening to that message",
            )
          ) {
            return of({ status: "no response" });
          }
          throw error;
        }),
        map((status) => ({ ...service, status })),
      ),
    );
  }

  async getServices() {
    const services = await this.serviceRepository.find();
    const serviceCalls = services.map((serv) =>
      this.gateway.sendDirect(serv.queue, {}).pipe(
        catchError((error) => {
          if (
            error instanceof Error &&
            error.message.includes(
              "There are no subscribers listening to that message",
            )
          ) {
            return of({ status: "no response" });
          }
          throw error;
        }),
        map((status) => ({ ...serv, status })),
      ),
    );
    return firstValueFrom(
      zip(serviceCalls).pipe(
        catchError((error) => {
          if (error) {
            this.logger.error(error);
          }
          return of([]);
        }),
      ),
    );
  }
}
