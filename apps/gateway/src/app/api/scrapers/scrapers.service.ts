import { MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapersService {
    public constructor(private gateway: ServiceGatewayService) {}

    public getHealth() {
        return this.gateway.send(MSMessage.GET_SERVICES, {});
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
