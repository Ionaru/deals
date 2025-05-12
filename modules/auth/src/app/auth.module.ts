import { DynamicModule, Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthGuard } from "./auth.guard.js";
import { RollingTokenInterceptor } from "./auth.interceptor.js";
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from "./auth.module-definition.js";
import { AuthResolver } from "./auth.resolver.js";
import { AuthService } from "./auth.service.js";
import { ChallengeModule } from "./challenge/challenge.module.js";
import { CookieService } from "./cookie.service.js";
import { Challenge } from "./models/challenge.js";
import { User } from "./models/user.js";
import { UserModule } from "./user/user.module.js";

@Module({})
export class AuthModule extends ConfigurableModuleClass {
  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const { module, imports, providers, exports } = super.registerAsync(
      options,
    );
    return {
      module,
      global: true,
      imports: [
        ...(imports ?? []),
        TypeOrmModule.forRootAsync({
          inject: [MODULE_OPTIONS_TOKEN],
          extraProviders: providers ?? [],
          name: "auth",
          useFactory: (options: typeof OPTIONS_TYPE) => {
            const database = options.databaseName;
            Logger.log(`Using Auth database: ${database}`, this.name);
            return {
              database,
              entities: [Challenge, User],
              extra: {
                authSource: "admin",
              },
              type: "mongodb",
              url: options.databaseUrl,
            };
          },
        }),
        JwtModule.registerAsync({
          useFactory: (options: typeof OPTIONS_TYPE) => ({
            secret: options.secret,
            signOptions: {
              expiresIn: "1d",
            },
          }),
          inject: [MODULE_OPTIONS_TOKEN],
          extraProviders: providers ?? [],
        }),
        ChallengeModule,
        UserModule,
      ],
      providers: [
        ...(providers ?? []),
        {
          provide: "APP_INTERCEPTOR",
          useClass: RollingTokenInterceptor,
        },
        AuthService,
        AuthGuard,
        AuthResolver,
        CookieService,
      ],
      exports: [
        ...(exports ?? []),
        AuthService,
        AuthGuard,
        MODULE_OPTIONS_TOKEN,
      ],
    };
  }
}
