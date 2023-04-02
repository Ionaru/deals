import {
    Async,
    MSEPayload,
    MSEvent,
    MSMessage,
    MSMPayload,
    MSMResponse,
} from '@deals/api';
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

    @EventPattern(MSEvent.DEAL_FOUND)
    public handleDealFound(
        payload: MSEPayload<MSEvent.DEAL_FOUND>,
    ): Async<void> {
        this.logger.log('Saving...', payload.shop);
        return this.foundDealsService.store(payload.shop, payload.deals);
    }

    @EventPattern(MSEvent.UNKNOWN_DEAL)
    public handleUnknownDeal(
        payload: MSEPayload<MSEvent.UNKNOWN_DEAL>,
    ): Async<void> {
        this.logger.log('Saving unknown deal...', payload.shop);
        return this.unknownDealService.store(payload.shop, payload.deal);
    }

    @MessagePattern(MSMessage.GET_DEALS)
    public handleGetDeals(
        _payload: MSMPayload<MSMessage.GET_DEALS>,
    ): Async<MSMResponse<MSMessage.GET_DEALS>> {
        this.logger.log('Getting deals...');
        return this.dealsService.getDeals();
    }

    @MessagePattern(MSMessage.REGISTER_SERVICE)
    public handleRegisterService(
        payload: MSMPayload<MSMessage.REGISTER_SERVICE>,
    ): Async<MSMResponse<MSMessage.REGISTER_SERVICE>> {
        this.logger.log('Registering service... ' + payload.name);
        return this.servicesService.registerService(
            payload.name,
            payload.queue,
            payload.isScraper,
        );
    }

    @MessagePattern(MSMessage.UNREGISTER_SERVICE)
    public handleUnregisterService(
        payload: MSMPayload<MSMessage.UNREGISTER_SERVICE>,
    ): Async<MSMResponse<MSMessage.UNREGISTER_SERVICE>> {
        this.logger.log('Unregistering service... ' + payload.queue);
        return this.servicesService.unregisterService(payload.queue);
    }

    @MessagePattern(MSMessage.GET_SERVICES)
    public handleGetServices(
        _payload: MSMPayload<MSMessage.GET_SERVICES>,
    ): Async<MSMResponse<MSMessage.GET_SERVICES>> {
        this.logger.log('Getting services...');
        return this.servicesService.getServices();
    }
}
