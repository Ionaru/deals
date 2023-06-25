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
        return this.client.send<MSMResponse<T>>(message, payload);
    }

    public emit<T extends keyof IMSEvent>(event: T, payload: MSEPayload<T>) {
        this.#logger.log(`Emitting ${event}...`);
        return this.client.emit<void>(event, payload);
    }

    public sendDirect(to: string, payload: MSMPayload<'direct'>) {
        this.#logger.log(`Sending direct to ${to}...`);
        return this.client.send<MSMResponse<'direct'>>(to, payload);
    }
}
