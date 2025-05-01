import { IUnknownDeal } from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";

import { Shop } from "../models/shop";
import { UnknownDeal } from "../models/unknown-deal";

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

  getUnknownDeals() {
    return this.unknownDealRepository.find({
      order: {
        createdOn: "DESC",
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
