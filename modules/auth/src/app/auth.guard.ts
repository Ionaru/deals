import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { MODULE_OPTIONS_TOKEN } from "./auth.module-definition.js";
import { AuthModuleOptions } from "./auth.module-options.js";
import { AuthService } from "./auth.service.js";
import { JwtPayload, Role } from "./jwt.type.js";
import { getSpecificCookie } from "./utility.js";
/**
 * Combine this decorator with `@UseGuards(AuthGuard)` to require a specific role.
 * If empty, the user is only required to be authenticated, and this decorator is not required.
 *
 * Usage:
 * ```
 * @UseGuards(AuthGuard)
 * @Roles([Role.MyRole])
 * myRoute() {...}
 * ```
 *
 * @param roles {Role[]} The roles that the user must have.
 */
export const Roles = Reflector.createDecorator<Role[]>();

/**
 * Requires the user to be authenticated. Usable on controllers and routes.
 * Can be combined with `@Roles([Role.MyRole])` to require a specific role.
 *
 * Usage:
 * ```
 * @UseGuards(AuthGuard)
 * myRoute() {...}
 * ```
 *
 *or
 * ```
 * @UseGuards(AuthGuard)
 * @Roles([Role.MyRole])
 * myRoute() {...}
 * ```
 */
@Injectable()
export class AuthGuard implements CanActivate {
  readonly #logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: AuthModuleOptions,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = getSpecificCookie(this.options.cookieName, context);
    const route = `${context.getClass().name}.${context.getHandler().name}`;
    if (!token) {
      this.#logger.warn(`A user tried to access ${route}, but had no token.`);
      throw new UnauthorizedException();
    }

    let payload: JwtPayload;
    try {
      payload = await this.authService.verify(token);
    } catch {
      this.#logger.warn(
        `A user tried to access ${route}, but the token failed to verify.`,
      );
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get(Roles, context.getHandler()) ?? [];
    if (roles.length === 0) {
      return true;
    }

    const userRoles = this.#rolesToString(payload.roles);
    const requiredRoles = this.#rolesToString(roles);
    const hasOneOfRequiredRoles = roles.some((role) =>
      payload.roles.includes(role),
    );
    if (!hasOneOfRequiredRoles) {
      this.#logger.warn(
        `User ${payload.username} (${payload.sub}) tried to access ${route}, but did not have the required roles. Required: ${requiredRoles}, User: ${userRoles}.`,
      );
    }

    return hasOneOfRequiredRoles;
  }

  #rolesToString(roles: Role[]) {
    return `[${roles.map((role) => Role[role]).join(", ")}]`;
  }
}
