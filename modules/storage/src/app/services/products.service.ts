import {
  ProductSortChoices,
  MSMessage,
  type MSMPayload,
  ExtendedProductDTO,
} from "@deals/api";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Brackets, Repository } from "typeorm";

import { Product } from "../models/product.js";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProduct(id: string) {
    return this.productRepository.findOne({
      relations: ["shop", "priceHistory", "dealHistory"],
      select: [],
      where: { id },
      withDeleted: true,
    }) as unknown as ExtendedProductDTO;
  }

  getProducts(payload: MSMPayload<MSMessage.GET_PRODUCTS>) {
    const queryBuilder = this.productRepository.createQueryBuilder("product");
    queryBuilder.leftJoinAndSelect("product.shop", "shop");

    if (payload.shop) {
      queryBuilder.where("shop.id = :shop", { shop: payload.shop });
    }

    if (payload.query) {
      const queryParts = payload.query.split(" ");
      queryBuilder.andWhere(
        new Brackets((qb) => {
          for (const part of queryParts) {
            const parameterName = `param${queryParts.indexOf(part)}`;
            qb.andWhere(`LOWER(product.name) LIKE LOWER(:${parameterName})`, {
              [parameterName]: `%${part}%`,
            });
          }
        }),
      );
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
