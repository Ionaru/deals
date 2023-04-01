import { IMSPayload, MSMessage, network } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';

@Injectable()
export class ServiceRegistryService {

    private readonly logger = new Logger(ServiceRegistryService.name);

    public constructor(
        @Inject('NAME') private readonly name: string,
        @Inject('ID') private readonly id: string,
        @Inject(network.PRIMARY) private readonly client: ClientProxy,
    ) {}

    public storeService() {
        this.logger.log('Storing service...');
        return this.#emit(MSMessage.REGISTER_SERVICE, {
            isScraper: true,
            name: this.name,
            queue: this.id,
        });
    }

    public removeService() {
        this.logger.log('Removing service...');
        return this.#emit(MSMessage.UNREGISTER_SERVICE, {
            queue: this.id,
        }).pipe(
            tap(() => this.logger.log('Removed service')),
        );
    }

    #emit<T extends keyof IMSPayload>(event: T, payload: IMSPayload[T]) {
        this.logger.log(`Emitting ${event}...`);
        return this.client.send(event, payload);
    }
}
