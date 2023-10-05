import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Challenge } from "../../models/challenge.model";

import { ChallengeController } from "./challenge.controller";
import { ChallengeService } from "./challenge.service";

@Module({
  controllers: [ChallengeController],
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeService],
})
export class ChallengeModule {}
