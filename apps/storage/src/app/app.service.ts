import { IProductDeal } from '@deals/api';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

import { Deal } from './models/deal';
import { Product } from './models/product';
import { Shop } from './models/shop';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    public constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Deal)
        private readonly dealRepository: Repository<Deal>,
    ) {}

    public async storeDeals(
        shop: string,
        deals: IProductDeal[],
    ): Promise<void> {
        const shopEntity = await getOrCreate(this.shopRepository, {
            name: shop,
        });

        const productsToSave: Product[] = [];
        const dealsToSave: Deal[] = [];

        const productEntities = await this.productRepository.findBy(
            deals.map((deal) => ({ name: deal.name })),
        );

        for (const deal of deals) {
            let productEntity = productEntities.find(
                (product) => product.name === deal.name,
            );
            if (!productEntity) {
                productEntity = this.productRepository.create({
                    imageUrl: deal.imageUrl,
                    name: deal.name,
                    price: deal.price,
                    productUrl: deal.productUrl,
                    shop: shopEntity,
                });
                productsToSave.push(productEntity);
            }

            dealsToSave.push(
                this.dealRepository.create({
                    dealPrice: deal.dealPrice,
                    dealQuantity: deal.purchaseAmount,
                    product: productEntity,
                }),
            );
        }
        this.logger.log(
            `Saving ${productsToSave.length} products and ${dealsToSave.length} deals`,
        );
        await this.productRepository.save(productsToSave, {
            chunk: 100,
            reload: false,
        });
        await this.deleteExistingDeals(shopEntity.id);
        await this.dealRepository.save(dealsToSave, {
            chunk: 100,
            reload: false,
        });
        this.logger.log('Saved');
    }

    private async deleteExistingDeals(shopId: string): Promise<void> {
        const existingDeals = await this.dealRepository.find({
            relations: ['product', 'product.shop'],
            where: {
                product: {
                    shop: {
                        id: shopId,
                    },
                },
            },
        });
        await this.dealRepository.remove(existingDeals, { chunk: 100 });
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
