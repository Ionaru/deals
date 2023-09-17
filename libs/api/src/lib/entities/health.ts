import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ServiceType } from '../common/service-type';

import { StatusDTO } from './status';

@ObjectType()
export class ServiceHealthDTO {
    @Field(() => ID)
    @ApiProperty()
    id!: string;

    @Field(() => String)
    @ApiProperty()
    name!: string;

    @Field(() => String)
    @ApiProperty()
    queue!: string;

    @Field(() => ServiceType)
    @ApiProperty()
    type!: ServiceType;

    @Field(() => StatusDTO)
    @ApiProperty()
    status!: StatusDTO;
}
