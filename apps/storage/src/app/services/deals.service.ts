import { DealSortChoices, MSMessage, MSMPayload } from '@deals/api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { Deal } from '../models/deal';

@Injectable()
export class DealsService {
    public constructor(
        @InjectRepository(Deal)
        private readonly dealRepository: Repository<Deal>,
    ) {}

    public getDeals(payload: MSMPayload<MSMessage.GET_DEALS>) {
        const queryBuilder = this.dealRepository.createQueryBuilder('deal');
        queryBuilder.leftJoinAndSelect('deal.product', 'product');
        queryBuilder.leftJoinAndSelect('product.shop', 'shop');

        for (const sort of payload.sort) {
            switch (sort) {
                case DealSortChoices.dealPrice: {
                    queryBuilder.addOrderBy('dealPrice', payload.order);
                    break;
                }
                case DealSortChoices.productName: {
                    queryBuilder.addOrderBy('product.name', payload.order);
                    break;
                }
                case DealSortChoices.shopName: {
                    queryBuilder.addOrderBy('shop.name', payload.order);
                    break;
                }
                case DealSortChoices.productPrice: {
                    queryBuilder.addOrderBy('product.price', payload.order);
                    break;
                }
                // case DealSortChoices.savings: {
                //     queryBuilder.addOrderBy('savings', payload.order);
                //     break;
                // }
            }
        }

        return paginate(queryBuilder, {
            limit: payload.limit,
            page: payload.page,
        });
    }
}
