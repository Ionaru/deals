import { IProductDeal } from "@deals/api";
import { splitArrayIntoChunks } from "@ionaru/array-utils";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";

import { DealHistory } from "../models/deal-history.js";
import { Deal } from "../models/deal.js";
import { PriceHistory } from "../models/price-history.js";
import { Product } from "../models/product.js";
import { Shop } from "../models/shop.js";

@Injectable()
export class FoundDealsService {
  readonly #logger = new Logger(FoundDealsService.name);

  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(PriceHistory)
    private readonly historyRepository: Repository<PriceHistory>,
    @InjectRepository(DealHistory)
    private readonly dealHistoryRepository: Repository<DealHistory>,
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async store(
    shop: string,
    deals: IProductDeal[],
    firstBatch: boolean,
    lastBatch: boolean,
  ): Promise<void> {
    const shopEntity = await getOrCreate(this.shopRepository, {
      name: shop,
    });

    await this.#saveProducts(deals, shopEntity);
    await this.#updateHistory(deals);

    if (firstBatch) {
      await this.#deleteExistingDeals(shopEntity.id);
    }

    await this.#saveDeals(deals);

    if (lastBatch) {
      await this.#markEndedDeals(shopEntity.id);
    }

    this.#logger.log("All done");
  }

  async #saveProducts(deals: IProductDeal[], shop: Shop): Promise<void> {
    this.#logger.log("Starting to save products");

    const productsToSave: Product[] = [];

    for (const productDeal of deals) {
      let productEntity = await this.productRepository.findOneBy({
        productUrl: productDeal.productUrl,
      });
      productEntity ??= this.productRepository.create({
        productUrl: productDeal.productUrl,
        shop,
      });

      if (
        productEntity.imageUrl !== productDeal.imageUrl ||
        productEntity.name !== productDeal.name ||
        productEntity.price !== productDeal.price
      ) {
        productEntity.imageUrl = productDeal.imageUrl;
        productEntity.name = productDeal.name;
        productEntity.price = productDeal.price;
        productsToSave.push(productEntity);
      }
    }

    this.#logger.log(`Saving ${productsToSave.length} products`);

    await this.productRepository.save(productsToSave, {
      chunk: 100,
      reload: false,
    });

    this.#logger.log("Saved products");
  }

  async #saveDeals(deals: IProductDeal[]): Promise<void> {
    this.#logger.log("Starting to save deals");

    const dealsToSave: Deal[] = [];

    for (const deal of deals) {
      const productEntity = await this.productRepository.findOneBy({
        productUrl: deal.productUrl,
      });
      if (!productEntity) {
        this.#logger.error(`Product for URL ${deal.productUrl} not found`);
        continue;
      }

      dealsToSave.push(
        this.dealRepository.create({
          dealPrice: deal.dealPrice,
          dealQuantity: deal.purchaseAmount,
          product: productEntity,
        }),
      );
    }

    this.#logger.log(`Saving ${dealsToSave.length} deals`);

    await this.dealRepository.save(dealsToSave, {
      chunk: 100,
      reload: false,
    });
    await this.dealHistoryRepository.save(dealsToSave, {
      chunk: 100,
      reload: false,
    });

    this.#logger.log("Saved deals");
  }

  async #markEndedDeals(shopId: string): Promise<void> {
    this.#logger.log("Starting to mark ended deals");

    const currentDeals = await this.dealRepository.find({
      relations: ["product", "product.shop"],
      where: {
        product: {
          shop: {
            id: shopId,
          },
        },
      },
    });

    const knownRunningDeals = await this.dealHistoryRepository.find({
      relations: ["product", "product.shop"],
      where: {
        product: {
          shop: {
            id: shopId,
          },
        },
      },
    });

    this.#logger.log(
      `Found ${currentDeals.length} current deals and ${knownRunningDeals.length} known running deals`,
    );

    const endedDeals = knownRunningDeals
      .filter(
        (deal) =>
          !currentDeals.some((currentDeal) => currentDeal.id === deal.id),
      )
      .map((deal) => deal.id);

    const endedDealChunks = splitArrayIntoChunks(endedDeals, 100);
    for (const chunk of endedDealChunks) {
      await this.dealHistoryRepository.softDelete(chunk);
    }

    this.#logger.log(`Marked ${endedDeals.length} deals as ended`);
  }

  async #updateHistory(deals: IProductDeal[]): Promise<void> {
    this.#logger.log("Starting to update price history");

    const historyToSave: PriceHistory[] = [];

    for (const deal of deals) {
      const productEntity = await this.productRepository.findOneBy({
        productUrl: deal.productUrl,
      });
      if (!productEntity) {
        continue;
      }

      let lastHistory = await this.historyRepository.findOne({
        order: {
          createdOn: "DESC",
        },
        where: {
          product: {
            id: productEntity.id,
          },
        },
      });
      if (lastHistory?.price === productEntity.price) {
        continue;
      }

      lastHistory = this.historyRepository.create({
        price: productEntity.price,
        product: productEntity,
      });
      historyToSave.push(lastHistory);
    }

    this.#logger.log(`Saving ${historyToSave.length} price history entries`);

    await this.historyRepository.save(historyToSave, {
      chunk: 100,
      reload: false,
    });

    this.#logger.log("Saved history");
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
  details: FindOptionsWhere<T> & DeepPartial<T>,
): Promise<T> => {
  let entity = await repository.findOneBy(details);
  if (!entity) {
    entity = repository.create(details);
    await repository.save(entity);
  }
  return entity;
};
