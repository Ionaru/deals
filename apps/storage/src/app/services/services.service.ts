import { MSMessage, network } from '@deals/api';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, of, zip } from 'rxjs';
import { Repository } from 'typeorm';

import { Service } from '../models/service';

@Injectable()
export class ServicesService {
    private readonly logger = new Logger(ServicesService.name);

    public constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,

        @Inject(network.PRIMARY) private client: ClientProxy,
    ) {}

    public async init(): Promise<void> {
        await this.serviceRepository.clear();
        this.client.emit(MSMessage.REPORT_SERVICE, {});
    }

    public async registerService(
        name: string,
        queue: string,
        _isScraper = false,
    ): Promise<Service> {
        const service = new Service();
        service.name = name;
        service.queue = queue;
        this.logger.log(`Registering service ${name} with queue ${queue}`);
        return this.serviceRepository.save(service);
    }

    public async unregisterService(queue: string): Promise<void> {
        await this.serviceRepository.delete({ queue });
    }

    public async getServices(): Promise<any> {
        const services = await this.serviceRepository.find();
        const serviceCalls = services.map((serv) =>
            this.client.send(serv.queue, {}).pipe(
                catchError((error) => {
                    if (
                        error instanceof Error &&
                        error.message.includes(
                            'There are no subscribers listening to that message',
                        )
                    ) {
                        return of({ status: 'no response' });
                    }
                    throw error;
                }),
                map((status) => ({ ...serv, status })),
            ),
        );
        return zip(serviceCalls).pipe(
            catchError((error) => {
                if (error) {
                    this.logger.error(error);
                }
                return of({});
            }),
        );
    }
}
