import {
    IMSEvent,
    IMSMessage,
    MSEPayload,
    MSMPayload,
    MSMResponse,
    network,
} from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/**
 * A strongly typed microservice gateway.
 */
@Injectable()
export class ServiceGatewayService {
    #logger = new Logger(ServiceGatewayService.name);

    public constructor(@Inject(network.PRIMARY) private client: ClientProxy) {}

    public send<T extends keyof IMSMessage>(
        message: T,
        payload: MSMPayload<T>,
    ) {
        this.#logger.log(`Sending ${message}...`);
        return this.client.send(message, payload) as Observable<MSMResponse<T>>;
    }

    public emit<T extends keyof IMSEvent>(event: T, payload: MSEPayload<T>) {
        this.#logger.log(`Emitting ${event}...`);
        return this.client.emit(event, payload) as Observable<void>;
    }

    public sendDirect(to: string, payload: any) {
        this.#logger.log(`Sending direct to ${to}...`);
        return this.client.send(to, payload) as Observable<any>;
    }
}
