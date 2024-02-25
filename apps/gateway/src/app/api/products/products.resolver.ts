import {
  Nullable,
  ProductDTO,
  ProductPaginatedType,
  ProductsArguments,
} from "@deals/api";
import { Resolver, Query, Args, ID } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { ProductsService } from "./products.service";

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductPaginatedType)
  products(
    @Args() queryArguments: ProductsArguments,
  ): Observable<ProductPaginatedType> {
    return this.productsService.getProducts(
      queryArguments.order,
      queryArguments.sort,
      queryArguments.limit,
      queryArguments.page,
      queryArguments.shop,
      queryArguments.query,
    );
  }

  @Query(() => ProductDTO, { nullable: true })
  product(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Nullable<ProductDTO>> {
    return this.productsService.getProduct(id);
  }
}
