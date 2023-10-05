import { ServiceType } from '@deals/api';
import { MicroserviceModule } from '@deals/service-registry';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Challenge } from './challenge/challenge.model';
import { ChallengeModule } from './challenge/challenge.module';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        // ***REMOVED***
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                Logger.log('Using database: Deals-Auth', AppModule.name);
                return {
                    database: 'Deals-Auth',
                    entities: [Challenge, User],
                    type: 'mongodb',
                    url: configService.getOrThrow('AUTH_DB_URL'),
                };
            },
        }),

        MicroserviceModule.forRoot('Auth', ServiceType.CORE),
        AuthModule,
        ChallengeModule,
        UserModule,
    ],
})
export class AppModule {}
