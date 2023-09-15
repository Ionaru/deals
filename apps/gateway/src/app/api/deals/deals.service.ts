import { DealSortChoices, MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

export enum Order {
    Ascending = 'ASC',
    Descending = 'DESC',
}

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
}
