/* eslint-disable max-classes-per-file */
import { UserDTO } from "@deals/api";
import { HttpStatus, UseGuards } from "@nestjs/common";
import {
  Args,
  ArgsType,
  Context,
  Field,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { Request } from "express";
import { GraphQLError } from "graphql";

import { IsAdminGuard } from "../../guards/is-admin.guard";

import { UsersService } from "./users.service";

@ArgsType()
export class UserArguments {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDTO, { nullable: true })
  user(
    @Args() queryArguments: UserArguments,
    @Context() { req: { session } }: { req: Request },
  ) {
    const userId = queryArguments.id || session.user;
    if (!userId) {
      return;
    }

    if (queryArguments.id && queryArguments.id !== session.user) {
      throw new GraphQLError("You are not allowed to access this user", {
        extensions: {
          code: HttpStatus[HttpStatus.FORBIDDEN],
        },
      });
    }

    return this.usersService.getUser(userId);
  }

  @Query(() => [UserDTO])
  @UseGuards(IsAdminGuard)
  users() {
    return this.usersService.getUsers();
  }
}
