import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { ScrapersService } from "./scrapers.service.js";

@Resolver()
export class ScrapersResolver {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Mutation(() => Boolean)
  startScraper(@Args("name", { type: () => String }) name: string): boolean {
    this.scrapersService.startScraping(name);
    return true;
  }
}
