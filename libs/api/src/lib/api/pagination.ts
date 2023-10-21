import { Type } from "@nestjs/common";
import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Max, Min } from "class-validator";
import { IPaginationMeta } from "nestjs-typeorm-paginate";

export interface IPaginatedType<T> {
  items: T[];
  meta: IPaginationMeta;
}

@ObjectType(`PaginationMeta`)
class PaginationMeta {
  @Field(() => Int, { nullable: true })
  totalItems?: number;

  @Field(() => Int)
  itemCount!: number;

  @Field(() => Int)
  itemsPerPage!: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int)
  currentPage!: number;
}

export const getPaginationArguments = (
  maximumLimit = 100,
  defaultLimit = 10,
) => {
  @ArgsType()
  class PaginationArguments {
    @Field(() => Int, { defaultValue: defaultLimit, nullable: true })
    @Max(maximumLimit)
    @Min(1)
    limit!: number;

    @Field(() => Int, { defaultValue: 1, nullable: true })
    @Min(1)
    page!: number;
  }

  return PaginationArguments;
};

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
