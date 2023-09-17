import { Nullable, ServiceHealthDTO } from '@deals/api';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { HealthService } from './health.service';

@Resolver()
export class HealthResolver {
    public constructor(private readonly scrapersService: HealthService) {}

    @Query(() => [ServiceHealthDTO])
    services(): Observable<ServiceHealthDTO[]> {
        return this.scrapersService.getServices();
    }

    @Query(() => ServiceHealthDTO, { nullable: true })
    service(@Args('id', { type: () => ID }) id: string): Observable<Nullable<ServiceHealthDTO>> {
        return this.scrapersService.getService(id);
    }
}
