import { MSMessage, network } from '@deals/api';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DealsService {
    public constructor(
        @Inject(network.PRIMARY) private client: ClientProxy,
    ) {}

    public getDeals() {
        return this.client.send(MSMessage.GET_DEALS, {});
    }
}
