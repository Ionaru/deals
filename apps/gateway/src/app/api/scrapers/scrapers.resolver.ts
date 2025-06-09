import { AuthGuard, Roles, Role } from "@deals/auth";
import { UseGuards } from "@nestjs/common";
import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { ScrapersService } from "./scrapers.service.js";

@Resolver()
@UseGuards(AuthGuard)
@Roles([Role.ADMIN])
export class ScrapersResolver {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Mutation(() => Boolean)
  startScraper(@Args("name", { type: () => String }) name: string): boolean {
    this.scrapersService.startScraping(name);
    return true;
  }
}
