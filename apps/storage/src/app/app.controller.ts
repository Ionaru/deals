import { IMSPayload, MSMessage } from '@deals/api';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { DealsService } from './services/deals.service';
import { FoundDealsService } from './services/found-deals.service';
import { ServicesService } from './services/services.service';
import { UnknownDealService } from './services/unknown-deal.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    public constructor(
        private readonly dealsService: DealsService,
        private readonly foundDealsService: FoundDealsService,
        private readonly unknownDealService: UnknownDealService,
        private readonly servicesService: ServicesService,
    ) {}

    @EventPattern(MSMessage.DEAL_FOUND)
    public handleDealFound(data: IMSPayload[MSMessage.DEAL_FOUND]) {
        this.logger.log('Saving...', data.shop);
        return this.foundDealsService.store(data.shop, data.deals);
    }

    @EventPattern(MSMessage.UNKNOWN_DEAL)
    public handleUnknownDeal(data: IMSPayload[MSMessage.UNKNOWN_DEAL]) {
        this.logger.log('Saving unknown deal...', data.shop);
        return this.unknownDealService.store(data.shop, data.deal);
    }

    @MessagePattern(MSMessage.GET_DEALS)
    public handleGetDeals() {
        this.logger.log('Getting deals...');
        return this.dealsService.getDeals();
    }

    @MessagePattern(MSMessage.REGISTER_SERVICE)
    // Does not receive after emit?
    public handleRegisterService(data: IMSPayload[MSMessage.REGISTER_SERVICE]) {
        // this.logger.log(`Registering service... ${data.name} (${data.queue})`);
        return this.servicesService.registerService(data.name, data.queue, data.isScraper);
    }

    @MessagePattern(MSMessage.UNREGISTER_SERVICE)
    public handleUnregisterService(data: IMSPayload[MSMessage.UNREGISTER_SERVICE]) {
        this.logger.log('Unregistering service... ' + data.queue);
        return this.servicesService.unregisterService(data.queue);
    }

    @MessagePattern(MSMessage.GET_SERVICES)
    public handleGetServices() {
        this.logger.log('Getting services...');
        return this.servicesService.getServices();
    }
}
