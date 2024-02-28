import { ProductSortChoices, MSMessage, MSMPayload } from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";

import { Product } from "../models/product";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProduct(id: string) {
    return this.productRepository.findOne({
      relations: ["shop"],
      where: { id },
    });
  }

  getProducts(payload: MSMPayload<MSMessage.GET_PRODUCTS>) {
    const queryBuilder = this.productRepository.createQueryBuilder("product");
    queryBuilder.leftJoinAndSelect("product.shop", "shop");

    if (payload.shop) {
      queryBuilder.where("shop.id = :shop", { shop: payload.shop });
    }

    if (payload.query) {
      const queryParts = payload.query.split(" ");
      for (const part of queryParts) {
        queryBuilder.andWhere("LOWER(product.name) LIKE LOWER(:query)", {
          query: `%${part}%`,
        });
      }
    }

    for (const sort of payload.sort) {
      switch (sort) {
        case ProductSortChoices.PRODUCT_NAME: {
          queryBuilder.addOrderBy("product.name", payload.order);
          break;
        }
        case ProductSortChoices.PRODUCT_PRICE: {
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
}
