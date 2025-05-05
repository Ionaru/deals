import { IUnknownDeal } from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";

import { Shop } from "../models/shop.js";
import { UnknownDeal } from "../models/unknown-deal.js";

@Injectable()
export class UnknownDealService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(UnknownDeal)
    private readonly unknownDealRepository: Repository<UnknownDeal>,
  ) {}

  async store(shop: string, deal: IUnknownDeal) {
    const shopEntity = await getOrCreate(this.shopRepository, {
      name: shop,
    });

    const existingDeal = await this.unknownDealRepository.findOneBy({
      deal: deal.promotionText,
      productUrl: deal.productUrl,
    });
    await (existingDeal
      ? this.unknownDealRepository.update(existingDeal.id, {
          id: existingDeal.id,
        })
      : this.unknownDealRepository.save(
          this.unknownDealRepository.create({
            deal: deal.promotionText,
            productUrl: deal.productUrl,
            shop: shopEntity,
          }),
        ));
  }

  getUnknownDeals() {
    return this.unknownDealRepository.find({
      order: {
        updatedOn: "DESC",
      },
      relations: ["shop"],
    });
  }

  async resolveUnknownDeal(id: string) {
    await this.unknownDealRepository.delete(id);
    return true;
  }
}

const getOrCreate = async <T extends ObjectLiteral>(
  repository: Repository<T>,
  details: FindOptionsWhere<T> & DeepPartial<T>,
): Promise<T> => {
  let entity = await repository.findOneBy(details);
  if (!entity) {
    entity = repository.create(details);
    await repository.save(entity);
  }
  return entity;
};
