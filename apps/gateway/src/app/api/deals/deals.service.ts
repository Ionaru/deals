import { DealDTO, DealSortChoices, MSMessage, Order } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DealsService {
    public constructor(private gateway: ServiceGatewayService) {}

    public getDeals(
        order: Order,
        sort: DealSortChoices[],
        limit: number,
        page: number,
    ) {
        return this.gateway.send(MSMessage.GET_DEALS, {
            limit,
            order,
            page,
            sort,
        });
    }

    public getDeal(
        id: string,
    ) {
        return this.gateway.send(MSMessage.GET_DEAL, { id });
    }
}
