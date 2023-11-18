import { ServiceType } from "@deals/api";
import { MicroserviceModule } from "@deals/service-registry";
import { Logger, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { Challenge } from "./models/challenge.model";
import { User } from "./models/user.model";
import { AuthModule } from "./modules/auth/auth.module";
import { ChallengeModule } from "./modules/challenge/challenge.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = "Deals-Auth";
        Logger.log(`Using database: ${database}`, AppModule.name);
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
export class AppModule implements OnApplicationShutdown {
  constructor(private dataSource: DataSource) {}

  onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      this.dataSource.destroy();
    }
  }
}
