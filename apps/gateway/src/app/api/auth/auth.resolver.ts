/* eslint-disable max-classes-per-file */
import {
    Args,
    ArgsType,
    Field,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';

import { AuthService } from './auth.service';

@ArgsType()
export class LoginArguments {
    @Field(() => String)
    authentication!: string;
}

@ArgsType()
export class RegisterArguments {
    @Field(() => String)
    registration!: string;
}

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query(() => String)
    getChallenge() {
        return this.authService.getNewChallenge();
    }

    @Mutation(() => Boolean)
    registerUser(@Args() queryArguments: RegisterArguments) {
        return this.authService.registerUser(queryArguments.registration);
    }

    @Mutation(() => Boolean)
    loginUser(@Args() queryArguments: LoginArguments) {
        return this.authService.loginUser(queryArguments.authentication);
    }
}
