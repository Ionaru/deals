import { DealSortChoices, MSMessage, MSMPayload } from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";

import { Deal } from "../models/deal";

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
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

    if (payload.shop) {
      queryBuilder.where("shop.id = :shop", { shop: payload.shop });
    }

    if (payload.query) {
      queryBuilder.andWhere("LOWER(product.name) LIKE LOWER(:query)", {
        query: `%${payload.query}%`,
      });
    }

    for (const sort of payload.sort) {
      switch (sort) {
        case DealSortChoices.DEAL_PRICE: {
          queryBuilder.addOrderBy("(dealPrice * dealQuantity)", payload.order);
          break;
        }
        case DealSortChoices.PRODUCT_NAME: {
          queryBuilder.addOrderBy("product.name", payload.order);
          break;
        }
        case DealSortChoices.PRODUCT_PRICE: {
          queryBuilder.addOrderBy(
            "(product.price * dealQuantity)",
            payload.order,
          );
          break;
        }
        case DealSortChoices.SAVINGS: {
          queryBuilder.addOrderBy(
            "(product.price * dealQuantity) - (dealPrice * dealQuantity)",
            payload.order,
          );
          break;
        }
      }
    }

    return paginate(queryBuilder, {
      limit: payload.limit,
      page: payload.page,
    });
  }
}
