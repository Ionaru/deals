import { IMSPayload, MSMessage, network } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StorageService {
    private readonly logger = new Logger(StorageService.name);

    public constructor(
        @Inject(network.PRIMARY) private readonly client: ClientProxy,
    ) {}

    public async store(deals: IMSPayload[MSMessage.DEAL_FOUND]) {
        this.logger.log('Storing...');
        this.#emit(MSMessage.DEAL_FOUND, deals);
        this.logger.log('Stored');
    }

    public async storeUnknownDeal(deals: IMSPayload[MSMessage.UNKNOWN_DEAL]) {
        this.logger.log('Storing unknown deal...');
        this.#emit(MSMessage.UNKNOWN_DEAL, deals);
        this.logger.log('Stored unknown deal');
    }

    #emit<T extends keyof IMSPayload>(event: T, payload: IMSPayload[T]) {
        this.logger.log(`Emitting ${event}...`);
        this.client.emit(event, payload);
        this.logger.log(`Emitted ${event}`);
    }
}
