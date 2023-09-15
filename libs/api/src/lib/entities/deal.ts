import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { paginated } from '../api/pagination';

import { ProductDTO } from './product';

export enum DealSortChoices {
    dealPrice = 'dealPrice',
    productName = 'productName',
    productPrice = 'productPrice',
    shopName = 'shopName',
    savings = 'savings',
}

@ObjectType()
export class DealDTO {
    @ApiProperty()
    @Field(() => String)
    id!: string;

    @ApiProperty()
    @Field(() => Int)
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
