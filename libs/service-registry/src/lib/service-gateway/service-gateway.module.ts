import { network } from "@deals/api";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ServiceGatewayService } from "./service-gateway.service";

@Module({
  controllers: [],
  exports: [ServiceGatewayService],
  imports: [
    ClientsModule.register([
      {
        name: network.PRIMARY,
        options: {},
        transport: Transport.NATS,
      },
    ]),
  ],
  providers: [ServiceGatewayService],
})
export class ServiceGatewayModule {}
