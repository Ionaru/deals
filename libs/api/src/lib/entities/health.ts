import { ApiProperty } from '@nestjs/swagger';

import { ServiceType } from '../common/service-type';

import { StatusDTO } from './status';

export class ServiceHealthDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    queue!: string;

    @ApiProperty()
    type!: ServiceType;

    @ApiProperty()
    status!: StatusDTO;
}
