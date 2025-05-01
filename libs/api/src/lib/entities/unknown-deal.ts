import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ShopDTO } from "./shop";

@ObjectType()
export class UnknownDealDTO {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  deal!: string;

  @Field(() => String)
  productUrl!: string;

  @Field(() => String)
  updatedOn!: Date;

  @Field(() => ShopDTO)
  shop!: ShopDTO;
}
