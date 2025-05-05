import {
  ArgsType,
  Field,
  Float,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { IsOptional, MaxLength, MinLength } from "class-validator";

import { Order } from "../api/messages.js";
import { getPaginationArguments, paginated } from "../api/pagination.js";
import { ProductSortChoices } from "../api/product-sort-choices.js";

import { ProductDealHistoryDTO } from "./deal-history.js";
import { ProductPriceHistoryDTO } from "./price-history.js";
import { ShopDTO } from "./shop.js";

registerEnumType(ProductSortChoices, { name: "ProductSortChoices" });

@ObjectType()
export class ProductDTO {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  imageUrl!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => String)
  productUrl!: string;

  @Field(() => ShopDTO)
  shop!: ShopDTO;
}

@ObjectType()
export class ExtendedProductDTO {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  imageUrl!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => String)
  productUrl!: string;

  @Field(() => ShopDTO)
  shop!: ShopDTO;

  @Field(() => [ProductPriceHistoryDTO])
  priceHistory!: ProductPriceHistoryDTO[];

  @Field(() => [ProductDealHistoryDTO])
  dealHistory!: ProductDealHistoryDTO[];
}

@ObjectType()
export class ProductPaginatedType extends paginated(ProductDTO) {}

@ArgsType()
export class ProductsArguments extends getPaginationArguments(100) {
  @Field(() => Order, { defaultValue: Order.ASCENDING, nullable: true })
  order!: Order;

  @Field(() => [ProductSortChoices], {
    defaultValue: [ProductSortChoices.PRODUCT_NAME],
    nullable: true,
  })
  sort!: [ProductSortChoices];

  @Field(() => String, { nullable: true })
  shop!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(100)
  @MinLength(3)
  @IsOptional()
  query!: string;
}
