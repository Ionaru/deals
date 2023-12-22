import { MSMessage, MSMPayload, MSMResponse } from "@deals/api";
import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { User } from '../../models/user.model';

import { UserService } from "./user.service";

const userToMessage = (user: User) => ({
    id: user.id.toHexString(),
    isAdmin: user.isAdmin,
    username: user.username,
  }
);

@Controller()
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @MessagePattern(MSMessage.GET_USER)
  async getUser(
    payload: MSMPayload<MSMessage.GET_USER>,
  ): Promise<MSMResponse<MSMessage.GET_USER>> {
    const user = await this.userService.getUser(payload.id);

    if (!user) {
      return null;
    }

    return userToMessage(user);
  }

  @MessagePattern(MSMessage.GET_USERS)
  async getUsers(
    _payload: MSMPayload<MSMessage.GET_USERS>,
  ): Promise<MSMResponse<MSMessage.GET_USERS>> {
    const users = await this.userService.getUsers();

    return users.map((user) => userToMessage(user));
  }
}
