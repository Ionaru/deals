import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { ShopDTO } from './shop';

@ObjectType()
export class ProductDTO {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    imageUrl!: string;

    @Field(() => Float)
    price!: number;

    @Field(() => String)
    productUrl!: string;

    @Field(() => ShopDTO)
    shop!: ShopDTO;
}
