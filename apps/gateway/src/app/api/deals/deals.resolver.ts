import { DealDTO, DealPaginatedType, DealsArguments } from '@deals/api';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { DealsService } from './deals.service';

@Resolver(() => DealDTO)
export class DealsResolver {
    constructor(private readonly dealsService: DealsService) {}

    @Query(() => DealPaginatedType)
    deals(
        @Args() queryArguments: DealsArguments,
    ): Observable<DealPaginatedType> {
        return this.dealsService.getDeals(
            queryArguments.order,
            queryArguments.sort,
            queryArguments.limit,
            queryArguments.page,
        );
    }

    @Query(() => DealDTO)
    deal(@Args('id', { type: () => Int }) id: number): Observable<DealDTO> {
        return this.dealsService.getDeal(id);
    }
}
