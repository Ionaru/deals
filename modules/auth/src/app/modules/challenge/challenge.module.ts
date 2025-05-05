import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Challenge } from "../../models/challenge.model.js";

import { ChallengeController } from "./challenge.controller.js";
import { ChallengeService } from "./challenge.service.js";

@Module({
  controllers: [ChallengeController],
  imports: [TypeOrmModule.forFeature([Challenge], "auth")],
  providers: [ChallengeService],
})
export class ChallengeModule {}
