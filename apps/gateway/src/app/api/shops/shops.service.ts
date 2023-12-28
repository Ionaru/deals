import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ShopsService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getShops() {
    return this.gateway.send(MSMessage.GET_SHOPS, {});
  }
}
