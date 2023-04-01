import { MSMessage } from '@deals/api';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ServiceRegistryService } from './service-registry.service';

@Controller()
export class ServiceRegistryController {

    private readonly logger = new Logger(ServiceRegistryController.name);

    public constructor(
        private readonly serviceRegistryService: ServiceRegistryService,
    ) {}

    @EventPattern(MSMessage.REPORT_SERVICE)
    public handleReportService() {
        this.logger.log('Reporting service...');
        return this.serviceRegistryService.storeService();
    }

}
