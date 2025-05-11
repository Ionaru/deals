import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Context } from "@nestjs/graphql";
import { CookieOptions } from "express";

import { MODULE_OPTIONS_TOKEN } from "./auth.module-definition.js";
import { AuthModuleOptions } from "./auth.module-options.js";
import { getRequest, getResponse, GqlContext } from "./utility.js";

@Injectable()
export class CookieService {
  readonly #cookieOptions: CookieOptions;
  readonly #authCookieName: string;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) readonly options: AuthModuleOptions,
  ) {
    this.#cookieOptions = {
      httpOnly: true,
      secure: options.isProduction,
      sameSite: "strict",
      maxAge: options.cookieExpiry * 60 * 1000,
    };

    this.#authCookieName = options.cookieName;
  }

  getAuthCookie(
    @Context() context: ExecutionContext | GqlContext,
  ): string | undefined {
    const cookies = getRequest(context).cookies;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cookies[this.#authCookieName];
  }

  setAuthCookie(token: string, context: ExecutionContext | GqlContext): void {
    getResponse(context).cookie(
      this.#authCookieName,
      token,
      this.#cookieOptions,
    );
  }

  clearAuthCookie(context: ExecutionContext | GqlContext): void {
    getResponse(context).clearCookie(this.#authCookieName);
  }
}
