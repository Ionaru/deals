import { randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { Challenge } from './challenge.model';

@Injectable()
export class ChallengeService {
    readonly #challengeTimeout = 5 * 60_000;

    constructor(
        @InjectRepository(Challenge)
        private readonly challengeRepository: MongoRepository<Challenge>,
    ) {}

    async getChallenge() {
        await this.#deleteOldChallenges();
        const challenge = randomBytes(64).toString('base64url');

        const newChallenge = this.challengeRepository.create({ challenge });
        await this.challengeRepository.save(newChallenge);

        return newChallenge.challenge;
    }

    async checkChallenge(challenge: string): Promise<boolean> {
        await this.#deleteOldChallenges();
        const existingChallenge = await this.challengeRepository.findOneBy({
            challenge,
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
            } as any,
        });
    }
}
