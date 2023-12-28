import { Transport } from "@nestjs/microservices";
import { NatsOptions } from "@nestjs/microservices/interfaces/microservice-configuration.interface";

export * from "./lib/api.js";
export * from "./lib/api/deal-sort-choices.js";
export * from "./lib/api/http.js";
export * from "./lib/api/events.js";
export * from "./lib/api/messages.js";
export * from "./lib/api/pagination.js";
export * from "./lib/common/service-type.js";
export * from "./lib/entities/deal.js";
export * from "./lib/entities/health.js";
export * from "./lib/entities/product.js";
export * from "./lib/entities/session.js";
export * from "./lib/entities/shop.js";
export * from "./lib/entities/unknown-deal.js";
export * from "./lib/entities/user.js";

export const natsOptions: NatsOptions = {
  options: {
    servers: [`nats://${process.env?.["NATS_HOST"] || "localhost"}:4222`],
  },
  transport: Transport.NATS,
};
