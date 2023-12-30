import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskDTO {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  lastRun!: string | undefined;

  @Field(() => String)
  nextRun!: string;
}
