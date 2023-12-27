import {
  DealDTO,
  DealPaginatedType,
  DealsArguments,
  Nullable,
  UnknownDealDTO,
} from "@deals/api";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { IsAdminGuard } from "../../guards/is-admin.guard";

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

  @Query(() => [UnknownDealDTO])
  @UseGuards(IsAdminGuard)
  unknownDeals(): Observable<UnknownDealDTO[]> {
    return this.dealsService.getUnknownDeals();
  }

  @Mutation(() => Boolean)
  @UseGuards(IsAdminGuard)
  resolveUnknownDeal(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<boolean> {
    return this.dealsService.resolveUnknownDeal(id);
  }
}
