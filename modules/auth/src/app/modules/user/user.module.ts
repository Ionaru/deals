import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../../models/user.model.js";

import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

@Module({
  controllers: [UserController],
  imports: [MicroserviceModule, TypeOrmModule.forFeature([User], "auth")],
  providers: [UserService],
})
export class UserModule {}
