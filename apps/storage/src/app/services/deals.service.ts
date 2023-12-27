import { DealSortChoices, MSMessage, MSMPayload } from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";

import { Deal } from "../models/deal";
import { UnknownDeal } from "../models/unknown-deal";

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(UnknownDeal)
    private readonly unknownDealRepository: Repository<UnknownDeal>,
  ) {}

  getDeal(id: string) {
    return this.dealRepository.findOne({
      relations: ["product", "product.shop"],
      where: { id },
    });
  }

  getDeals(payload: MSMPayload<MSMessage.GET_DEALS>) {
    const queryBuilder = this.dealRepository.createQueryBuilder("deal");
    queryBuilder.leftJoinAndSelect("deal.product", "product");
    queryBuilder.leftJoinAndSelect("product.shop", "shop");

    for (const sort of payload.sort) {
      switch (sort) {
        case DealSortChoices.DEAL_PRICE: {
          queryBuilder.addOrderBy("dealPrice", payload.order);
          break;
        }
        case DealSortChoices.PRODUCT_NAME: {
          queryBuilder.addOrderBy("product.name", payload.order);
          break;
        }
        case DealSortChoices.SHOP_NAME: {
          queryBuilder.addOrderBy("shop.name", payload.order);
          break;
        }
        case DealSortChoices.PRODUCT_PRICE: {
          queryBuilder.addOrderBy("product.price", payload.order);
          break;
        }
      }
    }

    return paginate(queryBuilder, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  getUnknownDeals() {
    return this.unknownDealRepository.find({
      relations: ["shop"],
    });
  }

  async resolveUnknownDeal(id: string) {
    await this.unknownDealRepository.delete(id);
    return true;
  }
}
