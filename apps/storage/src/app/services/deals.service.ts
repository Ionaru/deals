import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Deal } from '../models/deal';

@Injectable()
export class DealsService {
    public constructor(
        @InjectRepository(Deal)
        private readonly dealRepository: Repository<Deal>,
    ) {}

    public getDeals(): Promise<Deal[]> {
        return this.dealRepository.find({
            relations: ['product'],
        });
    }
}
