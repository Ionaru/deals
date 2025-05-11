import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";

export interface JwtData {
  sub: string;
  username: string;
  roles: Role[];
}

export interface JwtPayloadI extends JwtData {
  iat: number;
  exp: number;
}

export enum Role {
  ADMIN = "ADMIN",
}

registerEnumType(Role, { name: "Roles" });

@ObjectType()
export class JwtPayload implements JwtPayloadI {
  @Field(() => String)
  sub!: string;

  @Field(() => String)
  username!: string;

  @Field(() => [Role])
  roles!: Role[];

  @Field(() => Int)
  iat!: number;

  @Field(() => Int)
  exp!: number;
}
