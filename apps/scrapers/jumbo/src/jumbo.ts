import https from "node:https";

import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";
import { Logger } from "@nestjs/common";

import { SecondHalfPrice } from "./deals/second-half-price";
import { XForXPrice } from "./deals/x-for-x-price";
import { XPercentOff } from "./deals/x-percent-off";
import { XPlusXDeal } from "./deals/x-plus-x";
import { XPriceOff } from "./deals/x-price-off";
import { JumboDeal } from "./jumbo-deal";

enum Availability {
  AVAILABLE = "AVAILABLE",
  TEMPORARILY_UNAVAILABLE = "TEMPORARILY_UNAVAILABLE",
}

interface JumboGraphQLResponse {
  data: {
    searchProducts: {
      products: Array<{
        availability: {
          availability: Availability;
          isAvailable: boolean;
        };
        title: string;
        link: string;
        image: string;
        price: {
          price: number;
          pricePerUnit: {
            price: number;
            unit: string;
          };
          promoPrice: number;
        };
        promotions: Array<{
          isKiesAndMix: boolean;
          tags: Array<{
            text: string;
          }>;
        }>;
      }>;
    };
  };
}

enum JumboDealType {
  SECOND_HALF_PRICE = "SECOND_HALF_PRICE",
  X_FOR_X_PRICE = "X_FOR_X_PRICE",
  X_PERCENT_OFF = "X_PERCENT_OFF",
  X_PRICE_OFF = "X_PRICE_OFF",
  X_PLUS_X = "X_PLUS_X",
}

const jumboDealInformation: { [key in JumboDealType]: JumboDeal } =
  Object.freeze({
    [JumboDealType.X_PLUS_X]: new XPlusXDeal(),
    [JumboDealType.SECOND_HALF_PRICE]: new SecondHalfPrice(),
    [JumboDealType.X_PERCENT_OFF]: new XPercentOff(),
    [JumboDealType.X_PRICE_OFF]: new XPriceOff(),
    [JumboDealType.X_FOR_X_PRICE]: new XForXPrice(),
  });

export class Jumbo extends ScrapeWebsiteService {
  shopName = "Jumbo";

  protected baseUrl = "https://www.jumbo.com";
  protected paths = ["/producten/alle-aanbiedingen"];

  #query = `
  query SearchProducts($input: ProductSearchInput!) {
    searchProducts(input: $input) {
      products {
        availability {
          availability
          isAvailable
        }
        title
        link
        image
        price {
          price
          pricePerUnit {
            price
            unit
          }
          promoPrice
        }
        promotions {
          isKiesAndMix
          tags {
            text
          }
        }
      }
    }
  }
  `;

  #getResult(offset = 0) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edge/120.0.0.0",
      },
      hostname: "www.jumbo.com",
      method: "POST",
      path: "/api/graphql",
      port: 443,
    };

    const graphql = JSON.stringify({
      query: this.#query,
      variables: {
        input: {
          friendlyUrl: "alle-aanbiedingen",
          offSet: offset,
          searchTerms: "producten",
          searchType: "category",
        },
      },
    });

    return new Promise<JumboGraphQLResponse>((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(JSON.parse(data));
        });

        response.on("error", (error) => {
          reject(error);
        });
      });

      request.on("error", (error) => {
        reject(error);
      });

      request.write(graphql);
      request.end();
    });
  }

  protected getPageAmount(_document: Document): number {
    return 0;
  }

  override async scrapePath(_path: string): Promise<IProductDeal[]> {
    let offSet = 0;

    const allProducts = [];
    let pageProducts = [];

    do {
      const result = await this.#getResult(offSet);
      if ("errors" in result) {
        Logger.error(`Failed to fetch Jumbo deals at offset ${offSet}.`);
        Logger.error(result.errors);
        break;
      }

      pageProducts = result.data.searchProducts.products;
      allProducts.push(...pageProducts);
      offSet += 24;
    } while (pageProducts.length > 0);

    return this.#getDealsFromPage(allProducts);
  }

  #getDealsFromPage(
    products: JumboGraphQLResponse["data"]["searchProducts"]["products"],
  ): IProductDeal[] {
    const deals: IProductDeal[] = [];

    for (const product of products) {
      if (!product.availability.isAvailable) {
        continue;
      }

      const promotion = product.promotions.at(0);
      const text = promotion?.tags.at(0)?.text;
      if (!text) {
        continue;
      }

      const promotionText = text;
      const dealType = this.#parseDealText(promotionText);
      if (!dealType) {
        this.reportUnknownDeal({
          productUrl: product.link,
          promotionText,
        });
        continue;
      }

      const productPrice = product.price.price / 100;

      const dealPrice = jumboDealInformation[dealType].getDealPrice(
        productPrice,
        promotionText,
      );
      const purchaseAmount =
        jumboDealInformation[dealType].getPurchaseAmount(promotionText);

      deals.push({
        dealPrice,
        imageUrl: product.image,
        name: product.title,
        price: productPrice,
        productUrl: this.baseUrl + product.link,
        purchaseAmount,
      });
    }

    return deals;
  }

  protected getPageDeals(_page: Document) {
    return [];
  }

  protected modifyURL(url: URL) {
    return url;
  }

  protected setPage(url: URL, page: number) {
    url.searchParams.set("offSet", (page * 24).toString());
    return url;
  }

  #parseDealText(text: string): JumboDealType | void {
    for (const [type, dealType] of Object.entries(jumboDealInformation)) {
      if (dealType.matcher.test(text)) {
        return type as JumboDealType;
      }
    }
  }
}
