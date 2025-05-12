import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";

import { JwtPayload } from "./jwt.type.js";
import { UserService } from "./user/user.service.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async create(sub: string): Promise<string> {
    const { username, roles } = await this.userService.getUser(sub);
    const payload = { sub, username, roles };
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token).catch((error) => {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(error.message, { cause: error });
      }
      throw error;
    });
  }
}
