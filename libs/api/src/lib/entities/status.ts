import { ApiProperty } from '@nestjs/swagger';

export class StatusDTO {
    @ApiProperty()
    status!: string;

    @ApiProperty({ nullable: true })
    uptime?: number;
}
