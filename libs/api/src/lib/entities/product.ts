import { ApiProperty } from '@nestjs/swagger';

import { ShopDTO } from './shop';

export class ProductDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    imageUrl!: string;

    @ApiProperty()
    price!: number;

    @ApiProperty()
    productUrl!: string;

    @ApiProperty()
    shop!: ShopDTO;
}
