import { MSMessage, Order, ProductSortChoices } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getProducts(
    order: Order,
    sort: ProductSortChoices[],
    limit: number,
    page: number,
    shop: string,
    query: string,
  ) {
    return this.gateway.send(MSMessage.GET_PRODUCTS, {
      limit,
      order,
      page,
      query,
      shop,
      sort,
    });
  }

  getProduct(id: string) {
    return this.gateway.send(MSMessage.GET_PRODUCT, { id });
  }
}
