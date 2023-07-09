import { ApiProperty } from '@nestjs/swagger';

import { ProductDTO } from './product';

export class DealDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    dealPrice!: number;

    @ApiProperty()
    dealQuantity!: number;

    @ApiProperty()
    product!: ProductDTO;
}
