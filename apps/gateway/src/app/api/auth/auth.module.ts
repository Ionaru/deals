import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver.js";
import { AuthService } from "./auth.service.js";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
