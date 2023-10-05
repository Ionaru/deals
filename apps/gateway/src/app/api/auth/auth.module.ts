import { MicroserviceModule } from "@deals/service-registry";
import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  controllers: [],
  imports: [MicroserviceModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
