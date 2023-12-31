import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly gateway: ServiceGatewayService) {}

  getNewChallenge() {
    return this.gateway.send(MSMessage.GET_CHALLENGE, {});
  }

  loginUser(authentication: string) {
    return this.gateway.send(MSMessage.LOGIN_USER, {
      authentication,
    });
  }

  registerUser(registration: string) {
    return this.gateway.send(MSMessage.REGISTER_USER, {
      registration,
    });
  }

  addPasskey(user: string, registration: string) {
    return this.gateway.send(MSMessage.ADD_PASSKEY, {
      registration,
      user,
    });
  }
}
