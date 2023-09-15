import { DealDTO, DealPaginatedType, DealSortChoices } from '@deals/api';
import { Resolver, Query, Args, Int, registerEnumType } from '@nestjs/graphql';
import { map } from 'rxjs';

import { DealsService, Order } from './deals.service';

registerEnumType(Order, { name: 'Order' });

@Resolver(() => DealDTO)
export class DealsResolver {
    constructor(private readonly dealsService: DealsService) {}

    @Query(() => DealPaginatedType)
    deals(
        @Args('order', { nullable: true, type: () => Order })
        _order: Order = Order.Ascending,
    ) {
        return this.dealsService.getDeals(
            Order.Ascending,
            [DealSortChoices.productName],
            10,
            1,
        );
    }

    @Query(() => DealDTO)
    deal(@Args('id', { type: () => Int }) _id: number) {
        return this.dealsService
            .getDeals(Order.Ascending, [DealSortChoices.productName], 1, 1)
            .pipe(map((deals) => deals.items[0]));
    }
}
