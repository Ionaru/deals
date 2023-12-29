import { DealSortChoices, MSMessage, Order } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DealsService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getDeals(
    order: Order,
    sort: DealSortChoices[],
    limit: number,
    page: number,
    shop: string,
    query: string,
  ) {
    return this.gateway.send(MSMessage.GET_DEALS, {
      limit,
      order,
      page,
      query,
      shop,
      sort,
    });
  }

  getDeal(id: string) {
    return this.gateway.send(MSMessage.GET_DEAL, { id });
  }

  getUnknownDeals() {
    return this.gateway.send(MSMessage.GET_UNKNOWN_DEALS, {});
  }

  resolveUnknownDeal(id: string) {
    return this.gateway.send(MSMessage.RESOLVE_UNKNOWN_DEAL, { id });
  }
}
