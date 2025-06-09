import {
  DealDTO,
  DealPaginatedType,
  DealsArguments,
  Nullable,
  UnknownDealDTO,
} from "@deals/api";
import { AuthGuard, Role, Roles } from "@deals/auth";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { DealsService } from "./deals.service.js";

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
      queryArguments.shop,
      queryArguments.query,
    );
  }

  @Query(() => DealDTO, { nullable: true })
  deal(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Nullable<DealDTO>> {
    return this.dealsService.getDeal(id);
  }

  @Query(() => [UnknownDealDTO])
  @UseGuards(AuthGuard)
  @Roles([Role.ADMIN])
  unknownDeals(): Observable<UnknownDealDTO[]> {
    return this.dealsService.getUnknownDeals();
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles([Role.ADMIN])
  resolveUnknownDeal(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<boolean> {
    return this.dealsService.resolveUnknownDeal(id);
  }
}
