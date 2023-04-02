import { DynamicModule, Module } from '@nestjs/common';

import { ServiceGatewayModule } from './service-gateway/service-gateway.module';
import { ServiceRegistryModule } from './service-registry/service-registry.module';

@Module({
    controllers: [],
    exports: [ServiceGatewayModule],
    imports: [ServiceGatewayModule],
    providers: [],
})
export class MicroserviceModule {
    public static forRoot(name: string, autoAnnounce = false): DynamicModule {
        return {
            controllers: [],
            exports: [],
            imports: [ServiceRegistryModule.forRoot(name, autoAnnounce)],
            module: MicroserviceModule,
            providers: [],
        };
    }
}
