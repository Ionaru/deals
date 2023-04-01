import { MSMessage, network } from '@deals/api';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ScrapersService {
    public constructor(
        @Inject(network.PRIMARY) private storage: ClientProxy,
    ) {}

    public getHealth() {
        return this.storage.send(MSMessage.GET_SERVICES, {});
    //
    //
    //     const x = ClientProxyFactory.create({
    //         transport: Transport.RMQ,
    //         options: {
    //             queue
    //         }
    //     })
    //     return x.send(MSMessage.GET_HEALTH, {});
    }
}
