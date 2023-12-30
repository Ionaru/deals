import { IProductDeal } from "@deals/api";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

import { Deal } from "../models/deal";
import { Product } from "../models/product";
import { Shop } from "../models/shop";

@Injectable()
export class FoundDealsService {
  readonly #logger = new Logger(FoundDealsService.name);

  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async store(
    shop: string,
    deals: IProductDeal[],
    clear: boolean,
  ): Promise<void> {
    const shopEntity = await getOrCreate(this.shopRepository, {
      name: shop,
    });

    const productsToSave: Product[] = [];
    const dealsToSave: Deal[] = [];

    for (const productDeal of deals) {
      let productEntity = await this.productRepository.findOneBy({
        productUrl: productDeal.productUrl,
      });
      if (!productEntity) {
        productEntity = this.productRepository.create({
          productUrl: productDeal.productUrl,
          shop: shopEntity,
        });
      }
      productEntity.imageUrl = productDeal.imageUrl;
      productEntity.name = productDeal.name;
      productEntity.price = productDeal.price;
      productsToSave.push(productEntity);

      dealsToSave.push(
        this.dealRepository.create({
          dealPrice: productDeal.dealPrice,
          dealQuantity: productDeal.purchaseAmount,
          product: productEntity,
        }),
      );
    }
    this.#logger.log(
      `Saving ${productsToSave.length} products and ${dealsToSave.length} deals`,
    );
    await this.productRepository.save(productsToSave, {
      chunk: 100,
      reload: false,
    });
    if (clear) {
      await this.#deleteExistingDeals(shopEntity.id);
    }
    await this.dealRepository.save(dealsToSave, {
      chunk: 100,
      reload: false,
    });
    this.#logger.log("Saved");
  }

  async #deleteExistingDeals(shopId: string): Promise<void> {
    const existingDeals = await this.dealRepository.find({
      relations: ["product", "product.shop"],
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
