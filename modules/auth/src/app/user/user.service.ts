import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { server } from "@passwordless-id/webauthn";
import {
  AuthenticationJSON,
  RegistrationJSON,
} from "@passwordless-id/webauthn/dist/esm/types.js";
import { ObjectId } from "mongodb";
import { MongoRepository } from "typeorm";

import { ChallengeService } from "../challenge/challenge.service.js";
import { Credential } from "../models/credential.js";
import { User } from "../models/user.js";

const fromBase64 = (data: string) => Buffer.from(data, "base64").toString();

@Injectable()
export class UserService {
  readonly #logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User, "auth")
    private readonly userRepository: MongoRepository<User>,
    private readonly challengeService: ChallengeService,
  ) {}

  async loginUser(authentication: AuthenticationJSON): Promise<User> {
    const matchingUser = await this.userRepository.findOneBy({
      "credentials.id": authentication.id,
    });
    if (!matchingUser) {
      this.#logger.warn(
        `Could not find user for credential ${authentication.id}.`,
      );
      throw new NotFoundException("User not found");
    }

    const matchingCredential = matchingUser.credentials.find(
      (credential) => credential.id === authentication.id,
    );
    if (!matchingCredential) {
      // Should be impossible to get here, but just in case:
      this.#logger.error(
        `Could not find credential for found user ${matchingUser.username} (${matchingUser.id.toHexString()}).`,
      );
      throw new NotFoundException("Credential not found");
    }

    try {
      await server.verifyAuthentication(authentication, matchingCredential, {
        challenge: (challenge: string) =>
          this.challengeService.check(fromBase64(challenge)),
        counter: -1,
        origin: () => true,
        userVerified: true,
      });
    } catch (error) {
      this.#logger.warn(
        `User ${matchingUser.username} (${matchingUser.id.toHexString()}) failed to authenticate.`,
      );
      throw new UnauthorizedException("Incorrect credential", { cause: error });
    }

    return matchingUser;
  }

  async registerUser(registration: RegistrationJSON): Promise<boolean> {
    try {
      const registrationParsed = await server.verifyRegistration(registration, {
        challenge: (challenge: string) =>
          this.challengeService.check(fromBase64(challenge)),
        origin: () => true,
      });

      const user = new User();
      user.username = registrationParsed.user.name;
      user.roles = [];
      const credential = new Credential();
      credential.id = registrationParsed.credential.id;
      credential.publicKey = registrationParsed.credential.publicKey;
      credential.algorithm = registrationParsed.credential.algorithm;
      user.credentials = [credential];
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }

    return true;
  }

  async addPasskey(
    user: string,
    registration: RegistrationJSON,
  ): Promise<boolean> {
    try {
      const registrationParsed = await server.verifyRegistration(registration, {
        challenge: (challenge: string) =>
          this.challengeService.check(fromBase64(challenge)),
        origin: () => true,
      });

      const existingUser = await this.userRepository.findOneBy({
        _id: ObjectId.createFromHexString(user),
      });
      if (!existingUser) {
        throw new Error("User does not exist");
      }

      const credential = new Credential();
      credential.id = registrationParsed.credential.id;
      credential.publicKey = registrationParsed.credential.publicKey;
      credential.algorithm = registrationParsed.credential.algorithm;
      existingUser.credentials.push(credential);
      await this.userRepository.save(existingUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }

    return true;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      _id: ObjectId.createFromHexString(id),
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
