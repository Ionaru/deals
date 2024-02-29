import {
  AMSMResponse,
  Async,
  MSEPayload,
  MSEvent,
  MSMessage,
  MSMPayload,
} from "@deals/api";
import { Controller, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import { DealsService } from "./services/deals.service";
import { FoundDealsService } from "./services/found-deals.service";
import { ProductsService } from "./services/products.service";
import { ServicesService } from "./services/services.service";
import { ShopsService } from "./services/shops.service";
import { UnknownDealService } from "./services/unknown-deal.service";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly dealsService: DealsService,
    private readonly productsService: ProductsService,
    private readonly foundDealsService: FoundDealsService,
    private readonly unknownDealService: UnknownDealService,
    private readonly servicesService: ServicesService,
    private readonly shopsService: ShopsService,
  ) {}

  @MessagePattern(MSEvent.DEAL_FOUND)
  async handleDealFound(payload: MSEPayload<MSEvent.DEAL_FOUND>) {
    this.logger.log(`Saving deals for ${payload.shop}`);
    await this.foundDealsService.store(
      payload.shop,
      payload.deals,
      payload.firstBatch,
      payload.lastBatch,
    );
    return true;
  }

  @EventPattern(MSEvent.UNKNOWN_DEAL)
  handleUnknownDeal(payload: MSEPayload<MSEvent.UNKNOWN_DEAL>): Async<void> {
    this.logger.log("Saving unknown deal...", payload.shop);
    return this.unknownDealService.store(payload.shop, payload.deal);
  }

  @MessagePattern(MSMessage.GET_DEALS)
  handleGetDeals(
    payload: MSMPayload<MSMessage.GET_DEALS>,
  ): AMSMResponse<MSMessage.GET_DEALS> {
    return this.dealsService.getDeals(payload);
  }

  @MessagePattern(MSMessage.GET_DEAL)
  handleGetDeal(
    payload: MSMPayload<MSMessage.GET_DEAL>,
  ): AMSMResponse<MSMessage.GET_DEAL> {
    return this.dealsService.getDeal(payload.id);
  }

  @MessagePattern(MSMessage.GET_PRODUCTS)
  handleGetProducts(
    payload: MSMPayload<MSMessage.GET_PRODUCTS>,
  ): AMSMResponse<MSMessage.GET_PRODUCTS> {
    return this.productsService.getProducts(payload);
  }

  @MessagePattern(MSMessage.GET_PRODUCT)
  handleGetProduct(
    payload: MSMPayload<MSMessage.GET_PRODUCT>,
  ): AMSMResponse<MSMessage.GET_PRODUCT> {
    return this.productsService.getProduct(payload.id);
  }

  @MessagePattern(MSMessage.GET_UNKNOWN_DEALS)
  handleGetUnknownDeals(): AMSMResponse<MSMessage.GET_UNKNOWN_DEALS> {
    return this.unknownDealService.getUnknownDeals();
  }

  @MessagePattern(MSMessage.RESOLVE_UNKNOWN_DEAL)
  handleResolveUnknownDeal(
    payload: MSMPayload<MSMessage.RESOLVE_UNKNOWN_DEAL>,
  ): AMSMResponse<MSMessage.RESOLVE_UNKNOWN_DEAL> {
    return this.unknownDealService.resolveUnknownDeal(payload.id);
  }

  @MessagePattern(MSMessage.REGISTER_SERVICE)
  handleRegisterService(
    payload: MSMPayload<MSMessage.REGISTER_SERVICE>,
  ): AMSMResponse<MSMessage.REGISTER_SERVICE> {
    this.logger.log(`Registering ${payload.type} service... ${payload.name}`);
    return this.servicesService.registerService(
      payload.name,
      payload.queue,
      payload.type,
    );
  }

  @MessagePattern(MSMessage.UNREGISTER_SERVICE)
  handleUnregisterService(
    payload: MSMPayload<MSMessage.UNREGISTER_SERVICE>,
  ): AMSMResponse<MSMessage.UNREGISTER_SERVICE> {
    this.logger.log("Unregistering service... " + payload.queue);
    return this.servicesService.unregisterService(payload.queue);
  }

  @MessagePattern(MSMessage.GET_SERVICES)
  handleGetServices(
    _payload: MSMPayload<MSMessage.GET_SERVICES>,
  ): AMSMResponse<MSMessage.GET_SERVICES> {
    return this.servicesService.getServices();
  }

  @MessagePattern(MSMessage.GET_SERVICE)
  handleGetService(
    payload: MSMPayload<MSMessage.GET_SERVICE>,
  ): AMSMResponse<MSMessage.GET_SERVICE> {
    return this.servicesService.getService(payload.id);
  }

  @MessagePattern(MSMessage.GET_SHOPS)
  handleGetShops(): AMSMResponse<MSMessage.GET_SHOPS> {
    return this.shopsService.getShops();
  }
}
