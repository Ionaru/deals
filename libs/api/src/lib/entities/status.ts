import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusDTO {
    @Field(() => String)
    status!: string;

    @Field(() => Float, { nullable: true })
    uptime?: number;
}
