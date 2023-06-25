import { ApiProperty } from '@nestjs/swagger';

import type { IProduct } from './product';

export class IDeal {
    @ApiProperty()
    id!: string;
    @ApiProperty()
    dealPrice!: number;
    @ApiProperty()
    dealQuantity!: number;
    @ApiProperty()
    product!: IProduct;
}
