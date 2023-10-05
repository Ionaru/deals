import { DealSortChoices, MSMessage, Order } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DealsService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getDeals(order: Order, sort: DealSortChoices[], limit: number, page: number) {
    return this.gateway.send(MSMessage.GET_DEALS, {
      limit,
      order,
      page,
      sort,
    });
  }

  getDeal(id: string) {
    return this.gateway.send(MSMessage.GET_DEAL, { id });
  }
}
