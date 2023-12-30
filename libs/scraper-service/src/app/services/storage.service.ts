import { MSEvent, MSEPayload } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class StorageService {
  readonly #logger = new Logger(StorageService.name);

  constructor(private readonly gateway: ServiceGatewayService) {}

  async store(deals: MSEPayload<MSEvent.DEAL_FOUND>) {
    this.#logger.log("Storing...");
    await firstValueFrom(this.gateway.send(MSEvent.DEAL_FOUND as any, deals));
    this.#logger.log("Stored");
  }

  async storeUnknownDeal(deals: MSEPayload<MSEvent.UNKNOWN_DEAL>) {
    // this.logger.log('Storing unknown deal...');
    this.gateway.emit(MSEvent.UNKNOWN_DEAL, deals);
    // this.logger.log('Stored unknown deal');
  }
}
