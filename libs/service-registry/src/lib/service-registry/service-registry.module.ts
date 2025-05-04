import { randomUUID } from "node:crypto";

import { ServiceType } from "@deals/api";
import {
  BeforeApplicationShutdown,
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from "@nestjs/common";
import { catchError } from "rxjs";

import { ServiceGatewayModule } from "../service-gateway/service-gateway.module.js";

import { createServiceIdController } from "./service-id.controller.js";
import { ServiceRegistryController } from "./service-registry.controller.js";
import { ServiceRegistryService } from "./service-registry.service.js";

@Module({
  controllers: [ServiceRegistryController],
  exports: [],
  imports: [ServiceGatewayModule],
  providers: [ServiceRegistryService],
})
export class ServiceRegistryModule
  implements OnModuleInit, BeforeApplicationShutdown
{
  constructor(
    private readonly serviceRegistryService: ServiceRegistryService,
    @Inject("DELAY") private readonly delay: string,
  ) {}

  static forRoot(
    name: string,
    type: ServiceType,
    delay = false,
  ): DynamicModule {
    const id = randomUUID();

    return {
      controllers: [createServiceIdController(id)],
      exports: [],
      module: ServiceRegistryModule,
      providers: [
        { provide: "NAME", useValue: name },
        { provide: "ID", useValue: id },
        { provide: "TYPE", useValue: type },
        { provide: "DELAY", useValue: delay },
      ],
    };
  }

  onModuleInit() {
    if (!this.delay) {
      this.serviceRegistryService
        .storeService()
        .pipe(catchError((error) => this.#registryErrorHandler(error)))
        .subscribe();
    }
  }

  beforeApplicationShutdown() {
    return this.serviceRegistryService
      .removeService()
      .pipe(catchError((error) => this.#registryErrorHandler(error)));
  }

  #registryErrorHandler(error: unknown) {
    if (error instanceof Error && error.message.includes("Empty response")) {
      Logger.warn(
        "Service registry is not available, is storage online?",
        ServiceRegistryModule.name,
      );
      return [];
    }
    throw error;
  }
}
