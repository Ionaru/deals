import {
  ArgsType,
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { Order } from "../api/messages";
import { getPaginationArguments, paginated } from "../api/pagination";

import { ProductDTO } from "./product";

export enum DealSortChoices {
  DEAL_PRICE = "DEAL_PRICE",
  PRODUCT_NAME = "PRODUCT_NAME",
  PRODUCT_PRICE = "PRODUCT_PRICE",
  SHOP_NAME = "SHOP_NAME",
}

registerEnumType(DealSortChoices, { name: "DealSortChoices" });

@ObjectType()
export class DealDTO {
  @Field(() => ID)
  id!: string;

  @Field(() => Float)
  dealPrice!: number;

  @Field(() => Int)
  dealQuantity!: number;

  @Field(() => ProductDTO)
  product!: ProductDTO;
}

@ObjectType()
export class DealPaginatedType extends paginated(DealDTO) {}

@ArgsType()
export class DealsArguments extends getPaginationArguments(100) {
  @Field(() => Order, { defaultValue: Order.ASCENDING, nullable: true })
  order!: Order;

  @Field(() => [DealSortChoices], {
    defaultValue: [DealSortChoices.PRODUCT_NAME],
    nullable: true,
  })
  sort!: [DealSortChoices];
}
