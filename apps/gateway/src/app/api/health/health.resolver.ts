import { Nullable, ServiceHealthDTO } from "@deals/api";
import { UseGuards } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { LoggedInGuard } from "../../guards/logged-in.guard";

import { HealthService } from "./health.service";

@Resolver()
@UseGuards(LoggedInGuard)
export class HealthResolver {
  constructor(private readonly scrapersService: HealthService) {}

  @Query(() => [ServiceHealthDTO])
  services(): Observable<ServiceHealthDTO[]> {
    return this.scrapersService.getServices();
  }

  @Query(() => ServiceHealthDTO, { nullable: true })
  service(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Nullable<ServiceHealthDTO>> {
    return this.scrapersService.getService(id);
  }
}
