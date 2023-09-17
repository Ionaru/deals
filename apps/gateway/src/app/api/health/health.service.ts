import { MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    public constructor(private gateway: ServiceGatewayService) {}

    public getServices() {
        return this.gateway.send(MSMessage.GET_SERVICES, {});
    }

    public getService(id: string) {
        return this.gateway.send(MSMessage.GET_SERVICE, { id });
    }
}
