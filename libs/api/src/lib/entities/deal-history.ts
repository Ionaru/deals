import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductDealHistoryDTO {
  @Field(() => Float)
  dealPrice!: number;

  @Field(() => Float)
  dealQuantity!: number;

  @Field(() => String)
  createdOn!: string;

  @Field(() => String, { nullable: true })
  deletedOn!: string;
}
