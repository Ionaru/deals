import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  username!: string;

  @Field(() => Boolean)
  isAdmin!: boolean;
}
