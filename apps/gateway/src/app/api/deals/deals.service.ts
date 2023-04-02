import { MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DealsService {
    public constructor(private gateway: ServiceGatewayService) {}

    public getDeals() {
        return this.gateway.send(MSMessage.GET_DEALS, {});
    }
}
