import { IUnknownDeal } from '@deals/api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

import { Shop } from '../models/shop';
import { UnknownDeal } from '../models/unknown-deal';

@Injectable()
export class UnknownDealService {
    public constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(UnknownDeal)
        private readonly unknownDealRepository: Repository<UnknownDeal>,
    ) {}

    public async store(shop: string, deal: IUnknownDeal) {
        const shopEntity = await getOrCreate(this.shopRepository, {
            name: shop,
        });

        const existingDeal = await this.unknownDealRepository.findOneBy({
            deal: deal.promotionText,
        });
        if (!existingDeal) {
            await this.unknownDealRepository.save(
                this.unknownDealRepository.create({
                    deal: deal.promotionText,
                    productUrl: deal.productUrl,
                    shop: shopEntity,
                }),
            );
        }
    }
}

const getOrCreate = async <T extends ObjectLiteral>(
    repository: Repository<T>,
    details: DeepPartial<T>,
): Promise<T> => {
    let entity = await repository.findOneBy(details);
    if (!entity) {
        entity = repository.create(details);
        await repository.save(entity);
    }
    return entity;
};
