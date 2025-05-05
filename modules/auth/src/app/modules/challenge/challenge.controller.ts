import { type AMSMResponse, MSMessage, type MSMPayload } from "@deals/api";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { ChallengeService } from "./challenge.service.js";

@Controller()
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @MessagePattern(MSMessage.GET_CHALLENGE)
  // eslint-disable-next-line sonarjs/function-return-type
  getChallenge(): AMSMResponse<MSMessage.GET_CHALLENGE> {
    return this.challengeService.getChallenge();
  }

  @MessagePattern(MSMessage.CHECK_CHALLENGE)
  // eslint-disable-next-line sonarjs/function-return-type
  checkChallenge(
    payload: MSMPayload<MSMessage.CHECK_CHALLENGE>,
  ): AMSMResponse<MSMessage.CHECK_CHALLENGE> {
    return this.challengeService.checkChallenge(payload.challenge);
  }
}
