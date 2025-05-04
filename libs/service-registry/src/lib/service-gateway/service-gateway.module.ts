import { natsOptions, network } from "@deals/api";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";

import { ServiceGatewayService } from "./service-gateway.service.js";

@Module({
  controllers: [],
  exports: [ServiceGatewayService],
  imports: [
    ClientsModule.register([
      {
        name: network.PRIMARY,
        ...natsOptions,
      },
    ]),
  ],
  providers: [ServiceGatewayService],
})
export class ServiceGatewayModule {}
