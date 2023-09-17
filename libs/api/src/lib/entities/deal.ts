import { ArgsType, Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from '../api/messages';
import { getPaginationArguments, paginated } from '../api/pagination';

import { ProductDTO } from './product';

export enum DealSortChoices {
    DEAL_PRICE = 'DEAL_PRICE',
    PRODUCT_NAME = 'PRODUCT_NAME',
    PRODUCT_PRICE = 'PRODUCT_PRICE',
    SHOP_NAME = 'SHOP_NAME',
}

registerEnumType(DealSortChoices, { name: 'DealSortChoices' });

@ObjectType()
export class DealDTO {
    @ApiProperty()
    @Field(() => String)
    id!: string;

    @ApiProperty()
    @Field(() => Float)
    dealPrice!: number;

    @ApiProperty()
    @Field(() => Int)
    dealQuantity!: number;

    @ApiProperty()
    @Field(() => ProductDTO)
    product!: ProductDTO;
}

@ObjectType()
export class DealPaginatedType extends paginated(DealDTO) {}

@ArgsType()
export class DealsArguments extends getPaginationArguments(100) {
    @Field(() => Order, { defaultValue: Order.ASCENDING })
    order!: Order;

    @Field(() => [DealSortChoices], { defaultValue: [DealSortChoices.PRODUCT_NAME] })
    sort!: [DealSortChoices];
}
