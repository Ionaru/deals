import { ApiProperty } from '@nestjs/swagger';

import { ServiceType } from '../common/service-type';

export class ServiceDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    queue!: string;

    @ApiProperty()
    type!: ServiceType;
}
