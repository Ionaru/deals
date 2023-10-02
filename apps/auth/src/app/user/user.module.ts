import { MicroserviceModule } from '@deals/service-registry';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    imports: [MicroserviceModule, TypeOrmModule.forFeature([User])],
    providers: [UserService],
})
export class UserModule {}
