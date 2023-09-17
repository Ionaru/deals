import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ShopDTO {
    @ApiProperty()
    @Field(() => ID)
    id!: string;

    @ApiProperty()
    @Field(() => String)
    name!: string;
}
