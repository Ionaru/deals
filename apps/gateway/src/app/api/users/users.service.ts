import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getUser(id: string) {
    return this.gateway.send(MSMessage.GET_USER, { id });
  }

  getUsers() {
    return this.gateway.send(MSMessage.GET_USERS, {});
  }
}
