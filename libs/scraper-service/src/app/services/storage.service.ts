import { MSEvent, MSEPayload } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class StorageService {
  readonly #logger = new Logger(StorageService.name);

  constructor(private readonly gateway: ServiceGatewayService) {}

  async store(deals: MSEPayload<MSEvent.DEAL_FOUND>) {
    this.#logger.log("Storing...");
    this.gateway.emit(MSEvent.DEAL_FOUND, deals);
    this.#logger.log("Stored");
  }

  async storeUnknownDeal(deals: MSEPayload<MSEvent.UNKNOWN_DEAL>) {
    // this.logger.log('Storing unknown deal...');
    this.gateway.emit(MSEvent.UNKNOWN_DEAL, deals);
    // this.logger.log('Stored unknown deal');
  }
}
