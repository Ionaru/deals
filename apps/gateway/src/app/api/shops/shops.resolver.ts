import { ShopDTO } from "@deals/api";
import { Resolver, Query } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { ShopsService } from "./shops.service";

@Resolver()
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Query(() => [ShopDTO])
  shops(): Observable<ShopDTO[]> {
    return this.shopsService.getShops();
  }
}
