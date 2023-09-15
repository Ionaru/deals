import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ShopDTO } from './shop';

@ObjectType()
export class ProductDTO {
    @ApiProperty()
    @Field(() => String)
    id!: string;

    @ApiProperty()
    @Field(() => String)
    name!: string;

    @ApiProperty()
    @Field(() => String)
    imageUrl!: string;

    @ApiProperty()
    @Field(() => Int)
    price!: number;

    @ApiProperty()
    @Field(() => String)
    productUrl!: string;

    @ApiProperty()
    @Field(() => ShopDTO)
    shop!: ShopDTO;
}
