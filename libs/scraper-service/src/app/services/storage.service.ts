import { IMSPayload, MSMessage, service } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StorageService {
    private readonly logger = new Logger(StorageService.name);

    public constructor(@Inject(service.STORAGE) private client: ClientProxy) {}

    public async store(deals: IMSPayload[MSMessage.DEAL_FOUND]) {
        this.logger.log('Storing...');
        this.client.emit(MSMessage.DEAL_FOUND, deals);
        this.logger.log('Stored');
    }
}
