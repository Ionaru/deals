import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../../models/user.model.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
  controllers: [AuthController],
  imports: [MicroserviceModule, TypeOrmModule.forFeature([User], "auth")],
  providers: [AuthService],
})
export class AuthModule {}
