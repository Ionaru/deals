import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";

import { Challenge } from "../models/challenge.js";

@Injectable()
export class ChallengeService {
  readonly #challengeTimeout = 5 * 60_000;

  constructor(
    @InjectRepository(Challenge, "auth")
    private readonly challengeRepository: MongoRepository<Challenge>,
  ) {}

  async create(): Promise<string> {
    void this.#deleteOldChallenges();
    const bytes = new Uint8Array(64);
    crypto.getRandomValues(bytes);
    const challenge = btoa(String.fromCodePoint(...bytes));

    const newChallenge = this.challengeRepository.create({ challenge });
    await this.challengeRepository.save(newChallenge);

    return newChallenge.challenge;
  }

  async check(challenge: string): Promise<boolean> {
    void this.#deleteOldChallenges();
    const existingChallenge = await this.challengeRepository.findOneBy({
      challenge,
      createdAt: {
        $gt: new Date(Date.now() - this.#challengeTimeout),
        $lte: new Date(),
      } as unknown as string,
    });

    if (!existingChallenge || challenge !== existingChallenge.challenge) {
      return false;
    }

    await this.challengeRepository.delete(existingChallenge);

    return true;
  }

  async #deleteOldChallenges() {
    await this.challengeRepository.delete({
      createdAt: {
        $lte: new Date(Date.now() - this.#challengeTimeout),
      } as unknown as string,
    });
  }
}
