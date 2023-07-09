import { MSMessage, ServiceType } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { tap } from 'rxjs';

import { ServiceGatewayService } from '../service-gateway/service-gateway.service';

@Injectable()
export class ServiceRegistryService {
    private readonly logger = new Logger(ServiceRegistryService.name);

    public constructor(
        @Inject('NAME') private readonly name: string,
        @Inject('ID') private readonly id: string,
        @Inject('TYPE') private readonly type: ServiceType,
        @Inject(ServiceGatewayService) private gateway: ServiceGatewayService,
    ) {}

    public storeService() {
        this.logger.log('Storing service...');
        return this.gateway.send(MSMessage.REGISTER_SERVICE, {
            name: this.name,
            queue: this.id,
            type: this.type,
        });
    }

    public removeService() {
        this.logger.log('Removing service...');
        return this.gateway
            .send(MSMessage.UNREGISTER_SERVICE, {
                queue: this.id,
            })
            .pipe(tap(() => this.logger.log('Removed service')));
    }
}
