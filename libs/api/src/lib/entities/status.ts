import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusDTO {
    @Field(() => String)
    @ApiProperty()
    status!: string;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ nullable: true })
    uptime?: number;
}
