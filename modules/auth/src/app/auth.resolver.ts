import { AuthenticationDTO, RegistrationDTO } from "@deals/api";
import { Logger } from "@nestjs/common";
import { Mutation, Resolver, Query, Args, Context } from "@nestjs/graphql";
import {
  AuthenticationJSON,
  RegistrationJSON,
} from "@passwordless-id/webauthn/dist/esm/types.js";

import { AuthService } from "./auth.service.js";
import { ChallengeService } from "./challenge/challenge.service.js";
import { CookieService } from "./cookie.service.js";
import { JwtPayload } from "./jwt.type.js";
import { User } from "./models/user.js";
import { notLoggedInError } from "./types/dto.common.js";
import { MeDTO } from "./types/dto.me.js";
import { UserService } from "./user/user.service.js";
import { GqlContext } from "./utility.js";

@Resolver()
export class AuthResolver {
  readonly #logger = new Logger(AuthResolver.name);

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Mutation(() => String, { description: "base64 encoded random string" })
  createChallenge() {
    return this.challengeService.create();
  }

  @Query(() => Boolean)
  async check(@Args("challenge") challenge: string) {
    return this.challengeService.check(challenge);
  }

  @Query(() => JwtPayload)
  async verify(@Args("token") token: string) {
    return this.authService.verify(token);
  }

  @Query(() => MeDTO, { nullable: true })
  async me(@Context() context: GqlContext) {
    const cookie = this.cookieService.getAuthCookie(context);
    if (!cookie) {
      return;
    }

    try {
      return await this.authService.verify(cookie);
    } catch {
      return;
    }
  }

  @Mutation(() => Boolean)
  async loginUser(
    @Args() data: AuthenticationDTO,
    @Context() context: GqlContext,
  ) {
    let user: User;
    try {
      user = await this.userService.loginUser(
        data as unknown as AuthenticationJSON,
      );
    } catch {
      this.#logger.warn(`Could not login user ${data.id}.`);
      throw notLoggedInError;
    }

    const token = await this.authService.create(user.id.toHexString());
    this.cookieService.setAuthCookie(token, context);
    return true;
  }

  @Mutation(() => Boolean)
  async addUserCredential(
    @Args() data: RegistrationDTO,
    @Context() context: GqlContext,
  ) {
    const cookie = this.cookieService.getAuthCookie(context);
    if (!cookie) {
      return false;
    }

    try {
      const user = await this.authService.verify(cookie);
      return this.userService.addPasskey(
        user.sub,
        data as unknown as RegistrationJSON,
      );
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  registerUser(@Args() data: RegistrationDTO) {
    return this.userService.registerUser(data as unknown as RegistrationJSON);
  }

  @Mutation(() => Boolean)
  logoutUser(@Context() context: GqlContext) {
    this.cookieService.clearAuthCookie(context);
    return true;
  }
}
