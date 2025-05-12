import { ArgsType, Field, Resolver } from "@nestjs/graphql";

@ArgsType()
export class UserArguments {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class UsersResolver {}
