import { MSMessage, service } from '@deals/api';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
    public constructor(@Inject(service.STORAGE) private client: ClientProxy) {}

    public getData() {
        return this.client.send(MSMessage.GET_DEALS, {});
    }
}
