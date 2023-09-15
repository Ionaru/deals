import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ShopDTO {
    @ApiProperty()
    @Field(() => String)
    id!: string;

    @ApiProperty()
    @Field(() => String)
    name!: string;
}
