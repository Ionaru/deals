import { IMSPayload, MSMessage } from '@deals/api';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { FoundDealsService } from './services/found-deals.service';
import { UnknownDealService } from './services/unknown-deal.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    public constructor(
        private readonly foundDealsService: FoundDealsService,
        private readonly unknownDealService: UnknownDealService,
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
}
