import { UseGuards } from "@nestjs/common";
import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { IsAdminGuard } from "../../guards/is-admin.guard.js";

import { ScrapersService } from "./scrapers.service.js";

@Resolver()
@UseGuards(IsAdminGuard)
export class ScrapersResolver {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Mutation(() => Boolean)
  startScraper(@Args("name", { type: () => String }) name: string): boolean {
    this.scrapersService.startScraping(name);
    return true;
  }
}
