import { ApiProperty } from '@nestjs/swagger';

export class ShopDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;
}
