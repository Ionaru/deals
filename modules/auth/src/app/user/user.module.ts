import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChallengeModule } from "../challenge/challenge.module.js";
import { User } from "../models/user.js";

import { UserService } from "./user.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([User], "auth"), ChallengeModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
