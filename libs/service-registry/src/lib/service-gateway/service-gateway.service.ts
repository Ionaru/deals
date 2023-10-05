import {
  IMSEvent,
  IMSMessage,
  MSEPayload,
  MSMPayload,
  MSMResponse,
  network,
} from "@deals/api";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

/**
 * A strongly typed microservice gateway.
 */
@Injectable()
export class ServiceGatewayService {
  #logger = new Logger(ServiceGatewayService.name);

  constructor(@Inject(network.PRIMARY) private readonly client: ClientProxy) {}

  send<T extends keyof IMSMessage>(message: T, payload: MSMPayload<T>) {
    this.#logger.debug(`Sending ${message}...`);
    return this.client.send<MSMResponse<T>>(message, payload);
  }

  emit<T extends keyof IMSEvent>(event: T, payload: MSEPayload<T>) {
    this.#logger.debug(`Emitting ${event}...`);
    return this.client.emit<void>(event, payload);
  }

  sendDirect(to: string, payload: MSMPayload<"direct">) {
    this.#logger.debug(`Sending direct to ${to}...`);
    return this.client.send<MSMResponse<"direct">>(to, payload);
  }

  sendCommand(to: string) {
    this.#logger.debug(`Sending command to ${to}...`);
    return this.client.send(to, {});
  }
}
