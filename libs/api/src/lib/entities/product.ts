import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ShopDTO } from './shop';

@ObjectType()
export class ProductDTO {
    @ApiProperty()
    @Field(() => ID)
    id!: string;

    @ApiProperty()
    @Field(() => String)
    name!: string;

    @ApiProperty()
    @Field(() => String)
    imageUrl!: string;

    @ApiProperty()
    @Field(() => Float)
    price!: number;

    @ApiProperty()
    @Field(() => String)
    productUrl!: string;

    @ApiProperty()
    @Field(() => ShopDTO)
    shop!: ShopDTO;
}
