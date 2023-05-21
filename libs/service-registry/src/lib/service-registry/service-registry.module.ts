import { randomUUID } from 'node:crypto';

import {
    BeforeApplicationShutdown,
    DynamicModule,
    Inject,
    Logger,
    Module,
    OnModuleInit,
} from '@nestjs/common';
import { EmptyResponseException } from '@nestjs/microservices/errors/empty-response.exception';
import { catchError } from 'rxjs';

import { ServiceGatewayModule } from '../service-gateway/service-gateway.module';

import { createServiceIdController } from './service-id.controller';
import { ServiceRegistryController } from './service-registry.controller';
import { ServiceRegistryService } from './service-registry.service';

@Module({
    controllers: [ServiceRegistryController],
    exports: [],
    imports: [ServiceGatewayModule],
    providers: [ServiceRegistryService],
})
export class ServiceRegistryModule
    implements OnModuleInit, BeforeApplicationShutdown
{
    public constructor(
        private readonly serviceRegistryService: ServiceRegistryService,
        @Inject('DELAY') private readonly delay: string,
    ) {}

    public static forRoot(name: string, delay = false): DynamicModule {
        const id = randomUUID();

        return {
            controllers: [createServiceIdController(id)],
            exports: [],
            module: ServiceRegistryModule,
            providers: [
                { provide: 'NAME', useValue: name },
                { provide: 'ID', useValue: id },
                { provide: 'DELAY', useValue: delay },
            ],
        };
    }

    public onModuleInit() {
        if (!this.delay) {
            this.serviceRegistryService
                .storeService()
                .pipe(catchError(this.#registryErrorHandler))
                .subscribe();
        }
    }

    public beforeApplicationShutdown() {
        return this.serviceRegistryService
            .removeService()
            .pipe(catchError(this.#registryErrorHandler));
    }

    #registryErrorHandler(error: unknown) {
        if (error instanceof EmptyResponseException) {
            Logger.warn(
                'Service registry is not available, is storage online?',
                ServiceRegistryModule.name,
            );
            return [];
        }
        throw error;
    }
}