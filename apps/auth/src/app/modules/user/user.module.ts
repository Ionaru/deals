import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../../models/user.model";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  imports: [MicroserviceModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
