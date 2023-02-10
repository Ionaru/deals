import { IMSPayload, MSMessage } from '@deals/api';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    public constructor(private readonly appService: AppService) {}

    @EventPattern(MSMessage.DEAL_FOUND)
    public handleDealFound(data: IMSPayload[MSMessage.DEAL_FOUND]) {
        this.logger.log('Saving...', data.shop);
        return this.appService.storeDeals(data.shop, data.deals);
    }
}
