import { MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    constructor(private readonly gateway: ServiceGatewayService) {}

    getServices() {
        return this.gateway.send(MSMessage.GET_SERVICES, {});
    }

    getService(id: string) {
        return this.gateway.send(MSMessage.GET_SERVICE, { id });
    }
}
