import { MSEvent } from '@deals/api';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ServiceRegistryService } from './service-registry.service';

@Controller()
export class ServiceRegistryController {
    readonly #logger = new Logger(ServiceRegistryController.name);

    constructor(
        private readonly serviceRegistryService: ServiceRegistryService,
    ) {}

    @EventPattern(MSEvent.REPORT_SERVICE)
    handleReportService() {
        this.#logger.log('Reporting service...');
        return this.serviceRegistryService.storeService();
    }
}
