import { AMSMResponse, MSMessage, MSMPayload } from '@deals/api';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ChallengeService } from './challenge.service';

@Controller()
export class ChallengeController {
    constructor(private challengeService: ChallengeService) {}

    @MessagePattern(MSMessage.GET_CHALLENGE)
    getChallenge(): AMSMResponse<MSMessage.GET_CHALLENGE> {
        return this.challengeService.getChallenge();
    }

    @MessagePattern(MSMessage.CHECK_CHALLENGE)
    checkChallenge(
        payload: MSMPayload<MSMessage.CHECK_CHALLENGE>,
    ): AMSMResponse<MSMessage.CHECK_CHALLENGE> {
        return this.challengeService.checkChallenge(payload.challenge);
    }
}
