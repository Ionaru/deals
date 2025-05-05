import { MSEvent } from "@deals/api";
import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

import { ServiceRegistryService } from "./service-registry.service.js";

@Controller()
export class ServiceRegistryController {
  constructor(
    private readonly serviceRegistryService: ServiceRegistryService,
  ) {}

  @EventPattern(MSEvent.REPORT_SERVICE)
  handleReportService() {
    return this.serviceRegistryService.storeService();
  }
}
