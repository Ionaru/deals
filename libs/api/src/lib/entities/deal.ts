import {
  ArgsType,
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { DealSortChoices } from "../api/deal-sort-choices";
import { Order } from "../api/messages";
import { getPaginationArguments, paginated } from "../api/pagination";

import { ProductDTO } from "./product";

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

  @Field(() => String, { nullable: true })
  shop!: string;
}
