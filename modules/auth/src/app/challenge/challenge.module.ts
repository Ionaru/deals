import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Challenge } from "../models/challenge.js";

import { ChallengeService } from "./challenge.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Challenge], "auth")],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
