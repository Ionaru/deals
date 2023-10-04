import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class UserDTO {
    @Field(() => ID)
    @ApiProperty()
    id!: string;

    @Field(() => String)
    @ApiProperty()
    username!: string;

    @Field(() => Boolean)
    @ApiProperty()
    isAdmin!: boolean;
}
