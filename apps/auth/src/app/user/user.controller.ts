/* eslint-disable sort-keys */

import { MSMessage, MSMPayload, MSMResponse } from "@deals/api";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(MSMessage.GET_USER)
  async getUser(
    payload: MSMPayload<MSMessage.GET_USER>,
  ): Promise<MSMResponse<MSMessage.GET_USER>> {
    const user = await this.userService.getUser(payload.id);

    if (!user) {
      return;
    }

    return {
      id: user.id.toHexString(),
      isAdmin: false,
      username: user.username,
    };
  }

  @MessagePattern(MSMessage.GET_USERS)
  async getUsers(
    _payload: MSMPayload<MSMessage.GET_USERS>,
  ): Promise<MSMResponse<MSMessage.GET_USERS>> {
    const users = await this.userService.getUsers();

    return users.map((user) => ({
      id: user.id.toHexString(),
      isAdmin: false,
      username: user.username,
    }));
  }
}
