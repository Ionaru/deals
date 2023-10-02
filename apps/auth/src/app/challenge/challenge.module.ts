import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChallengeController } from './challenge.controller';
import { Challenge } from './challenge.model';
import { ChallengeService } from './challenge.service';

@Module({
    controllers: [ChallengeController],
    imports: [TypeOrmModule.forFeature([Challenge])],
    providers: [ChallengeService],
})
export class ChallengeModule {}
