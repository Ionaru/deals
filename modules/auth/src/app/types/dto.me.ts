import { Field, ObjectType } from "@nestjs/graphql";

import { JwtData, Role } from "../jwt.type.js";

@ObjectType()
export class MeDTO implements JwtData {
  @Field(() => String)
  sub!: string;

  @Field(() => String)
  username!: string;

  @Field(() => [Role])
  roles!: Role[];
}
