import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShopDTO {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;
}
