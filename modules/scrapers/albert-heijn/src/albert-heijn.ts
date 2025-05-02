import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";
import { Logger } from "@nestjs/common";

import {
  BonusGroup,
  BonusSection,
  BonusSegment,
  DiscountAmount,
  DiscountCode,
  DiscountFixedPrice,
  DiscountOneFree,
  DiscountOneHalfPrice,
  DiscountOpIsOp,
  DiscountPercentage,
  DiscountWeight,
  DiscountXForY,
  DiscountXPlusYFree,
  OrderAvailabilityStatus,
  Product,
  ProductCard,
} from "./api";

interface AnonymousToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface ParsedDiscount {
  price: number;
  dealPrice: number;
  purchaseAmount: number;
}

/**
 * https://nick.bouwhuis.net/posts/2022-01-22-automating-any-app/
 * https://gist.github.com/jabbink/8bfa44bdfc535d696b340c46d228fdd1?permalink_comment_id=4745156
 * https://raw.githubusercontent.com/NickBouwhuis/Albert-Heijn-OpenAPI/main/ah-openapi.yaml
 * https://github.com/bartmachielsen/SupermarktConnector/blob/master/supermarktconnector/ah.py
 */
export class AlbertHeijn extends ScrapeWebsiteService {
  shopName = "Albert Heijn";

  appieHeaders = {
    "Content-Type": "application/json",
    "X-Application": "AHWEBSHOP",
  };

  protected baseUrl = "https://api.ah.nl";
  protected paths = [
    "Aardappel, groente, fruit",
    "Salades, pizza, maaltijden",
    "Vlees, kip, vis, vega",
    "Kaas, vleeswaren, tapas",
    "Zuivel, plantaardig en eieren",
    "Bakkerij en banket",
    "Ontbijtgranen en beleg",
    "Snoep, koek, chips en chocolade",
    "Tussendoortjes",
    "Frisdrank, sappen, koffie, thee",
    "Wijn en bubbels",
    "Bier en aperitieven",
    "Pasta, rijst en wereldkeuken",
    "Soepen, sauzen, kruiden, olie",
    "Diepvries",
    "Drogisterij",
    "Baby en kind",
    "Huishouden",
    "Huisdier",
    "Koken, tafelen, vrije tijd",
  ];

  protected setPage(url: URL, page: number): URL {
    url.searchParams.set("page", page.toString());
    return url;
  }

  protected getPageAmount(_document: Document): number {
    return 0;
  }

  protected modifyURL(url: URL): URL {
    return url;
  }

  protected getPageDeals(_document: Document): IProductDeal[] {
    return [];
  }

  override async scrapePath(path: string): Promise<IProductDeal[]> {
    const deals: IProductDeal[] = [];

    const token = await this.getToken();
    const bonusSection = await this.getBonusSection(token, path);

    const products =
      bonusSection.bonusGroupOrProducts?.filter(
        (bonusGroupOrProduct): bonusGroupOrProduct is Product =>
          "product" in bonusGroupOrProduct,
      ) ?? [];

    const bonusGroups =
      bonusSection.bonusGroupOrProducts?.filter(
        (bonusGroupOrProduct): bonusGroupOrProduct is BonusGroup =>
          "bonusGroup" in bonusGroupOrProduct,
      ) ?? [];

    for (const bonusGroup of bonusGroups) {
      const bonusSegment = await this.getBonusSegment(token, bonusGroup);
      if (bonusSegment) {
        products.push(...bonusSegment.products.map((product) => ({ product })));
      }
    }

    for (const product of products) {
      if (
        product.product.orderAvailabilityStatus !==
        OrderAvailabilityStatus.IN_ASSORTMENT
      ) {
        continue;
      }

      const image = product.product.images.find((x) => x.width === 200);
      if (!image) {
        Logger.warn(
          `Product ${product.product.title} has no image`,
          AlbertHeijn.name,
        );
        continue;
      }

      const parsed = await this.parseDiscounts(product, token);
      if (!parsed) {
        continue;
      }

      if (parsed.dealPrice === parsed.price) {
        Logger.warn(
          `Failed to calculate price of ${product.product.title}`,
          AlbertHeijn.name,
        );
        continue;
      }

      deals.push({
        dealPrice: parsed.dealPrice,
        imageUrl: image.url,
        name: product.product.title.trim(),
        price: parsed.price,
        productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
        purchaseAmount: parsed.purchaseAmount,
      });
    }

    return deals;
  }

  getPriceFromSalesUnit(
    product: Product,
    productCard: ProductCard,
  ): number | undefined {
    if (!product.product.unitPriceDescription) {
      return undefined;
    }
    const match = /€(?<price>\d+(?:.\d+)?)/.exec(
      product.product.unitPriceDescription,
    )?.groups;
    if (match) {
      const { price } = match;
      if (!price) {
        return undefined;
      }
      let salesUnitSize = product.product.salesUnitSize;
      let salesUnitPrice: number | undefined;
      if (salesUnitSize) {
        salesUnitPrice = this.getSalesUnitPrice(price, salesUnitSize);
        if (salesUnitPrice) {
          return salesUnitPrice;
        }
      }

      salesUnitSize = productCard.productCard.salesUnitSize;
      if (salesUnitSize) {
        salesUnitPrice = this.getSalesUnitPrice(price, salesUnitSize);
        if (salesUnitPrice) {
          return salesUnitPrice;
        }
      }

      return Number(price);
    }

    return undefined;
  }

  getSalesUnitPrice(price: string, salesUnitSize: string): number | undefined {
    return this.getSalesPriceWeight(Number(price), salesUnitSize);
  }

  getSalesPriceWeight(
    price: number,
    salesUnitSize: string,
  ): number | undefined {
    const weight = this.getWeight(salesUnitSize);
    return weight ? price * weight : undefined;
  }

  getWeight(salesUnitSize: string): number | undefined {
    return (
      this.getWeightFromKilo(salesUnitSize) ??
      this.getWeightFromGrams(salesUnitSize)
    );
  }

  getWeightFromKilo(salesUnitSize: string): number | undefined {
    const salesUnitKilo = /(?<weight>\d+(?:.\d+)?) k(?:ilo)?g?$/.exec(
      salesUnitSize,
    )?.groups;
    if (salesUnitKilo?.["weight"]) {
      return Number(salesUnitKilo["weight"]);
    }
    return undefined;
  }

  getWeightFromGrams(salesUnitSize: string): number | undefined {
    const salesUnitGram = /(?<weight>\d+(?:.\d+)?) g(?:ram)?$/.exec(
      salesUnitSize,
    )?.groups;
    if (salesUnitGram?.["weight"]) {
      return Number(salesUnitGram["weight"]) / 1000;
    }
    return undefined;
  }

  async getProductDetails(
    token: string,
    product: Product,
  ): Promise<ProductCard> {
    const productResponse = await fetch(
      `${this.baseUrl}/mobile-services/product/detail/v4/fir/${product.product.webshopId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...this.appieHeaders,
        },
      },
    );

    return (await productResponse.json()) as ProductCard;
  }

  async getToken(): Promise<string> {
    const tokenResponse = await fetch(
      `${this.baseUrl}/mobile-auth/v1/auth/token/anonymous`,
      {
        body: JSON.stringify({ clientId: "appie" }),
        headers: this.appieHeaders,
        method: "POST",
      },
    );
    const tokenJson = (await tokenResponse.json()) as AnonymousToken;
    return tokenJson.access_token;
  }

  async getBonusSection(token: string, path: string): Promise<BonusSection> {
    const bonusSectionUrl = new URL(
      "mobile-services/bonuspage/v2/section",
      this.baseUrl,
    );
    bonusSectionUrl.searchParams.set("category", path);
    bonusSectionUrl.searchParams.set("promotionType", "NATIONAL");
    const bonusSectionResponse = await fetch(bonusSectionUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...this.appieHeaders,
      },
    });

    return (await bonusSectionResponse.json()) as BonusSection;
  }

  async getBonusSegment(
    token: string,
    bonusGroup: BonusGroup,
  ): Promise<BonusSegment | undefined> {
    const bonusSegmentUrl = new URL(
      "mobile-services/bonuspage/v1/segment",
      this.baseUrl,
    );
    bonusSegmentUrl.searchParams.set("segmentId", bonusGroup.bonusGroup.id);
    bonusSegmentUrl.searchParams.set(
      "date",
      new Date().toISOString().slice(0, 10),
    );
    const bonusGroupResponse = await fetch(bonusSegmentUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...this.appieHeaders,
      },
    });
    if (!bonusGroupResponse.ok) {
      Logger.warn(
        `Bonus group ${bonusGroup.bonusGroup.id} could not be fetched`,
        AlbertHeijn.name,
      );
      return undefined;
    }

    return (await bonusGroupResponse.json()) as BonusSegment;
  }

  async parseDiscounts(
    product: Product,
    token: string,
  ): Promise<ParsedDiscount | undefined> {
    const parsed: Array<ParsedDiscount | undefined> = [];

    for (const discount of product.product.discountLabels) {
      switch (discount.code) {
        case DiscountCode.DISCOUNT_AMOUNT:
        case DiscountCode.DISCOUNT_PERCENTAGE:
        case DiscountCode.DISCOUNT_OP_IS_OP: {
          return this.parseSimpleDiscount(product, discount);
        }

        case DiscountCode.DISCOUNT_FIXED_PRICE: {
          parsed.push(
            await this.parseFixedPriceDiscount(product, token, discount),
          );
          break;
        }

        case DiscountCode.DISCOUNT_X_PLUS_Y_FREE: {
          parsed.push(this.parseXPlusYFreeDiscount(product, discount));
          break;
        }

        case DiscountCode.DISCOUNT_X_FOR_Y: {
          parsed.push(await this.parseXForYDiscount(product, token, discount));
          break;
        }

        case DiscountCode.DISCOUNT_ONE_HALF_PRICE: {
          parsed.push(this.parseOneHalfPriceDiscount(product, discount));
          break;
        }

        case DiscountCode.DISCOUNT_WEIGHT: {
          parsed.push(await this.parseWeightDiscount(product, token, discount));
          break;
        }

        case DiscountCode.DISCOUNT_ONE_FREE: {
          parsed.push(this.parseOneFreeDiscount(product, discount));
          break;
        }

        case DiscountCode.DISCOUNT_BONUS: {
          return undefined;
        }

        default: {
          Logger.warn(
            `Unknown discount code: ${discount.code}`,
            AlbertHeijn.name,
          );
          Logger.warn(JSON.stringify(discount, null, 2), AlbertHeijn.name);
          this.reportUnknownDeal({
            productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
            promotionText: discount.code,
          });
        }
      }
    }

    const discounts = parsed.filter(
      (parsedDiscount): parsedDiscount is ParsedDiscount =>
        parsedDiscount !== undefined,
    );

    if (discounts.length === 0) {
      return undefined;
    }

    return discounts.reduce((previous, current) =>
      previous.dealPrice * previous.purchaseAmount <
      current.dealPrice * current.purchaseAmount
        ? previous
        : current,
    );
  }

  async parseFixedPriceDiscount(
    product: Product,
    token: string,
    discount: DiscountFixedPrice,
  ): Promise<ParsedDiscount | undefined> {
    if (product.product.priceBeforeBonus) {
      return {
        dealPrice: discount.price,
        price: product.product.priceBeforeBonus,
        purchaseAmount: 1,
      };
    } else {
      const details = await this.getProductDetails(token, product);
      if (details.productCard.currentPrice) {
        return {
          dealPrice: discount.price,
          price:
            this.getPriceFromSalesUnit(product, details) ??
            details.productCard.currentPrice,
          purchaseAmount: 1,
        };
      } else {
        this.reportUnknownDeal({
          productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
          promotionText: discount.code,
        });
      }
    }
    return undefined;
  }

  parseXPlusYFreeDiscount(
    product: Product,
    discount: DiscountXPlusYFree,
  ): ParsedDiscount | undefined {
    if (product.product.priceBeforeBonus) {
      return {
        dealPrice:
          (product.product.priceBeforeBonus * discount.count) /
          (discount.count + discount.freeCount),
        price: product.product.priceBeforeBonus,
        purchaseAmount: discount.count + discount.freeCount,
      };
    } else {
      this.reportUnknownDeal({
        productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
        promotionText: discount.code,
      });
    }
    return undefined;
  }

  parseOneFreeDiscount(
    product: Product,
    discount: DiscountOneFree,
  ): ParsedDiscount | undefined {
    if (product.product.priceBeforeBonus) {
      return {
        dealPrice:
          product.product.priceBeforeBonus -
          product.product.priceBeforeBonus / discount.count,
        price: product.product.priceBeforeBonus,
        purchaseAmount: discount.count,
      };
    } else {
      this.reportUnknownDeal({
        productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
        promotionText: discount.code,
      });
    }
    return undefined;
  }

  parseSimpleDiscount(
    product: Product,
    discount: DiscountAmount | DiscountPercentage | DiscountOpIsOp,
  ): ParsedDiscount | undefined {
    if (product.product.priceBeforeBonus && product.product.currentPrice) {
      return {
        dealPrice: product.product.currentPrice,
        price: product.product.priceBeforeBonus,
        purchaseAmount: 1,
      };
    } else {
      this.reportUnknownDeal({
        productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
        promotionText: discount.code,
      });
    }
    return undefined;
  }

  async parseXForYDiscount(
    product: Product,
    token: string,
    discount: DiscountXForY,
  ): Promise<ParsedDiscount | undefined> {
    if (product.product.priceBeforeBonus) {
      return {
        dealPrice: discount.price / discount.count,
        price: product.product.priceBeforeBonus,
        purchaseAmount: discount.count,
      };
    } else {
      const details = await this.getProductDetails(token, product);
      if (details.productCard.currentPrice) {
        return {
          dealPrice: discount.price / discount.count,
          price: details.productCard.currentPrice,
          purchaseAmount: discount.count,
        };
      } else {
        this.reportUnknownDeal({
          productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
          promotionText: discount.code,
        });
      }
    }
    return undefined;
  }

  parseOneHalfPriceDiscount(
    product: Product,
    discount: DiscountOneHalfPrice,
  ): ParsedDiscount | undefined {
    if (product.product.priceBeforeBonus) {
      return {
        dealPrice:
          (product.product.priceBeforeBonus +
            product.product.priceBeforeBonus / 2) /
          2,
        price: product.product.priceBeforeBonus,
        purchaseAmount: 2,
      };
    } else {
      this.reportUnknownDeal({
        productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
        promotionText: discount.code,
      });
    }
    return undefined;
  }

  async parseWeightDiscount(
    product: Product,
    token: string,
    discount: DiscountWeight,
  ): Promise<ParsedDiscount | undefined> {
    if (product.product.priceBeforeBonus && product.product.currentPrice) {
      return {
        dealPrice: product.product.currentPrice,
        price: product.product.priceBeforeBonus,
        purchaseAmount: discount.unit === "GRAM" ? 1 : discount.count,
      };
    } else {
      const details = await this.getProductDetails(token, product);
      if (details.productCard.currentPrice) {
        return {
          dealPrice: discount.price,
          price: details.productCard.currentPrice,
          purchaseAmount: discount.count,
        };
      } else {
        this.reportUnknownDeal({
          productUrl: `https://www.ah.nl/producten/product/${product.product.webshopId}`,
          promotionText: discount.code,
        });
      }
    }
    return undefined;
  }
}
