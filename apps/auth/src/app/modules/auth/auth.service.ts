import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationParsed } from "@passwordless-id/webauthn/dist/esm/types";
import { firstValueFrom } from "rxjs";
import { MongoRepository } from "typeorm";

import { Credential } from "../../models/auth.model";
import { User } from "../../models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly gateway: ServiceGatewayService,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  checkChallenge(challenge: string) {
    return firstValueFrom(
      this.gateway.send(MSMessage.CHECK_CHALLENGE, { challenge }),
    );
  }

  async findExistingUser(credentialId: string) {
    try {
      return this.userRepository.findOneBy({
        "credentials.id": credentialId,
      });
    } catch (error) {
      Logger.error(error, AuthService.name);
      return;
    }
  }

  async storeUser(registrationData: RegistrationParsed) {
    const existingUser = await this.findExistingUser(
      registrationData.credential.id,
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User();
    user.username = registrationData.username;
    const credential = new Credential();
    credential.id = registrationData.credential.id;
    credential.publicKey = registrationData.credential.publicKey;
    credential.algorithm = registrationData.credential.algorithm;
    user.credentials = [credential];
    await this.userRepository.save(user);
  }
}
