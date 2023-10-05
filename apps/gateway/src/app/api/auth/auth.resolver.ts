/* eslint-disable max-classes-per-file */
import { SessionDTO } from '@deals/api';
import {
    Args,
    ArgsType,
    Context,
    Field,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { Request } from 'express';
import { bindCallback, map, tap } from 'rxjs';

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
    constructor(private readonly authService: AuthService) {}

    @Query(() => String)
    challenge() {
        return this.authService.getNewChallenge();
    }

    @Query(() => SessionDTO)
    session(
        @Context() { req: { session } }: { req: Request },
    ) {
        return session;
    }

    @Mutation(() => Boolean)
    registerUser(@Args() queryArguments: RegisterArguments) {
        return this.authService.registerUser(queryArguments.registration);
    }

    @Mutation(() => Boolean)
    loginUser(
        @Args() queryArguments: LoginArguments,
        @Context() { req: { session } }: { req: Request },
    ) {
        return this.authService.loginUser(queryArguments.authentication).pipe(
            tap((result) => {
                if (result) {
                    session.user = result;
                }
            }),
            map(Boolean),
        );
    }

    @Mutation(() => Boolean)
    logoutUser(@Context() { req: { session } }: { req: Request }) {
        return bindCallback(session.destroy.bind(session))().pipe(
            map(() => true),
        );
    }
}
