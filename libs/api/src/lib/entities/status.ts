import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class StatusDTO {
    @Field(() => String)
    @ApiProperty()
    status!: string;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ nullable: true })
    uptime?: number;
}
