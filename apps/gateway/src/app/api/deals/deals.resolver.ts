import {
  DealDTO,
  DealPaginatedType,
  DealsArguments,
  Nullable,
} from "@deals/api";
import { Resolver, Query, Args, ID } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { DealsService } from "./deals.service";

@Resolver()
export class DealsResolver {
  constructor(private readonly dealsService: DealsService) {}

  @Query(() => DealPaginatedType)
  deals(@Args() queryArguments: DealsArguments): Observable<DealPaginatedType> {
    return this.dealsService.getDeals(
      queryArguments.order,
      queryArguments.sort,
      queryArguments.limit,
      queryArguments.page,
    );
  }

  @Query(() => DealDTO, { nullable: true })
  deal(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Nullable<DealDTO>> {
    return this.dealsService.getDeal(id);
  }
}
