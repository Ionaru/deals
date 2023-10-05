import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ServiceType } from "../common/service-type";

import { StatusDTO } from "./status";

@ObjectType()
export class ServiceHealthDTO {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  queue!: string;

  @Field(() => ServiceType)
  type!: ServiceType;

  @Field(() => StatusDTO)
  status!: StatusDTO;
}
