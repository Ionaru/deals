import { ServiceType } from "@deals/api";
import { DynamicModule, Module } from "@nestjs/common";

import { ServiceGatewayModule } from "./service-gateway/service-gateway.module.js";
import { ServiceRegistryModule } from "./service-registry/service-registry.module.js";

@Module({
  controllers: [],
  exports: [ServiceGatewayModule],
  imports: [ServiceGatewayModule],
  providers: [],
})
export class MicroserviceModule {
  static forRoot(
    name: string,
    type: ServiceType,
    autoAnnounce = false,
  ): DynamicModule {
    return {
      controllers: [],
      exports: [],
      imports: [ServiceRegistryModule.forRoot(name, type, autoAnnounce)],
      module: MicroserviceModule,
      providers: [],
    };
  }
}
