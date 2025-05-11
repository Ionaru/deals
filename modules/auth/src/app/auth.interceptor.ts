import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service.js";
import { CookieService } from "./cookie.service.js";
import { JwtPayloadI } from "./jwt.type.js";

type JwtData = Omit<JwtPayloadI, "iat" | "exp"> & {
  iat?: number;
  exp?: number;
};

@Injectable()
export class RollingTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<Response>,
  ): Promise<Observable<Response>> {
    const cookie = this.cookieService.getAuthCookie(context);
    if (cookie) {
      try {
        const decoded: JwtData = await this.authService.verify(cookie);
        delete decoded.iat;
        delete decoded.exp;
        const newToken = await this.jwtService.signAsync(decoded);
        this.cookieService.setAuthCookie(newToken, context);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Logger.error(error.message, RollingTokenInterceptor.name);
        }
      }
    }

    return next.handle();
  }
}
