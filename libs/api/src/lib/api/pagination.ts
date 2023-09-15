import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

@ObjectType(`PaginationMeta`)
class PaginationMeta {
    @Field(() => Int)
    totalItems!: number;

    @Field(() => Int)
    itemCount!: number;

    @Field(() => Int)
    itemsPerPage!: number;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => Int)
    currentPage!: number;
}

export const paginated = <T>(type: Type<T>): Type<IPaginatedType<T>> => {
    @ObjectType({ isAbstract: true })
    class PaginatedType {
        @Field(() => [type])
        items!: T[];

        @Field(() => PaginationMeta)
        meta!: PaginationMeta;
    }

    return PaginatedType;
};
