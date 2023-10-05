import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../../models/user.model";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [MicroserviceModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService],
})
export class AuthModule {}
