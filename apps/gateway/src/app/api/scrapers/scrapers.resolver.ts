import { UseGuards } from "@nestjs/common";
import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { LoggedInGuard } from "../../guards/logged-in.guard";

import { ScrapersService } from "./scrapers.service";

@Resolver()
@UseGuards(LoggedInGuard)
export class ScrapersResolver {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Mutation(() => Boolean)
  startScraper(@Args("name", { type: () => String }) name: string): boolean {
    this.scrapersService.startScraping(name);
    return true;
  }
}
