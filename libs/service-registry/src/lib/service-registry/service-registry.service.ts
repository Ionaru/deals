import { MSMessage, ServiceType } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { tap } from 'rxjs';

import { ServiceGatewayService } from '../service-gateway/service-gateway.service';

@Injectable()
export class ServiceRegistryService {
    readonly #logger = new Logger(ServiceRegistryService.name);

    constructor(
        @Inject('NAME') private readonly name: string,
        @Inject('ID') private readonly id: string,
        @Inject('TYPE') private readonly type: ServiceType,
        @Inject(ServiceGatewayService)
        private readonly gateway: ServiceGatewayService,
    ) {}

    storeService() {
        this.#logger.log('Storing service...');
        return this.gateway.send(MSMessage.REGISTER_SERVICE, {
            name: this.name,
            queue: this.id,
            type: this.type,
        });
    }

    removeService() {
        this.#logger.log('Removing service...');
        return this.gateway
            .send(MSMessage.UNREGISTER_SERVICE, {
                queue: this.id,
            })
            .pipe(tap(() => this.#logger.log('Removed service')));
    }
}
