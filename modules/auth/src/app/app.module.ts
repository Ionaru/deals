import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { Logger, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectDataSource, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { Challenge } from "./models/challenge.model.js";
import { User } from "./models/user.model.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { ChallengeModule } from "./modules/challenge/challenge.module.js";
import { UserModule } from "./modules/user/user.module.js";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: "auth",
      useFactory: (configService: ConfigService) => {
        const database = configService.getOrThrow<string>("AUTH_DB_NAME");
        Logger.log(`Using database: ${database}`, Auth.name);
        return {
          database,
          entities: [Challenge, User],
          extra: {
            authSource: "admin",
          },
          type: "mongodb",
          url: configService.getOrThrow("AUTH_DB_URL"),
        };
      },
    }),

    MicroserviceModule.forRoot("Auth", ServiceType.CORE),
    AuthModule,
    ChallengeModule,
    UserModule,
  ],
})
export class Auth implements OnApplicationShutdown {
  constructor(
    @InjectDataSource("auth")
    private readonly dataSource: DataSource,
  ) {}

  onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      void this.dataSource.destroy();
    }
  }
}
