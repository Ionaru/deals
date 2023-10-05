import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
