import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionDTO {
    @Field(() => String, {nullable: true})
    user?: string;
}
