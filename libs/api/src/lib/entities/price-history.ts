import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductPriceHistoryDTO {
  @Field(() => Float)
  price!: number;

  @Field(() => String)
  createdOn!: string;
}
