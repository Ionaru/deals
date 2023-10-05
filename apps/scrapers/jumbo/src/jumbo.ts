import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";

import { SecondHalfPrice } from "./deals/second-half-price";
import { XForXPrice } from "./deals/x-for-x-price";
import { XPercentOff } from "./deals/x-percent-off";
import { XPlusXDeal } from "./deals/x-plus-x";
import { JumboDeal } from "./jumbo-deal";

enum JumboDealType {
  SECOND_HALF_PRICE,
  X_FOR_X_PRICE,
  X_PERCENT_OFF,
  X_PLUS_X,
}

const jumboDealInformation: { [key in JumboDealType]: JumboDeal } =
  Object.freeze({
    [JumboDealType.X_PLUS_X]: new XPlusXDeal(),
    [JumboDealType.SECOND_HALF_PRICE]: new SecondHalfPrice(),
    [JumboDealType.X_PERCENT_OFF]: new XPercentOff(),
    [JumboDealType.X_FOR_X_PRICE]: new XForXPrice(),
  });

export class Jumbo extends ScrapeWebsiteService {
  shopName = "Jumbo";

  protected baseUrl = "https://www.jumbo.com";
  protected paths = ["/producten/alle-aanbiedingen"];

  protected getPageAmount(document: Document): number {
    const pager = document.querySelector(".pages-grid");
    const pagerText = pager?.textContent?.trim();
    return Number(pagerText?.split(" ").at(-1)) || 0;
  }

  protected getPageDeals(page: Document) {
    const products = page.querySelectorAll("div.card-product");

    const deals: IProductDeal[] = [];

    for (const product of products) {
      const promotion = product.querySelector(".promotions");
      if (!promotion) {
        continue;
      }

      const promotionText = promotion
        .querySelector(".jum-tag.prominent")
        ?.textContent?.trim();
      if (!promotionText) {
        continue;
      }

      const promoPriceText = product
        .querySelector(".promo-price")
        ?.textContent?.trim()
        .replace(",", ".");
      const currentPriceText = product
        .querySelector(".current-price")
        ?.textContent?.trim()
        .replace(" ", ".");
      const productPrice = promoPriceText
        ? Number(promoPriceText)
        : Number(currentPriceText);
      const productName = product
        .querySelector(".name .title")
        ?.textContent?.trim();
      const productUrl = `${this.baseUrl}${product
        .querySelector("a")
        ?.getAttribute("href")}`;

      const dealType = this.#parseDealText(promotionText);
      if (!dealType) {
        this.reportUnknownDeal({
          productUrl,
          promotionText,
        });
        continue;
      }

      const dealPrice = jumboDealInformation[dealType].getDealPrice(
        Number(productPrice),
        promotionText,
      );
      const purchaseAmount =
        jumboDealInformation[dealType].getPurchaseAmount(promotionText);

      deals.push({
        dealPrice,
        imageUrl:
          product.querySelector(".product-image img")?.getAttribute("src") ||
          "",
        name: productName || "Unknown product",
        price: productPrice,
        productUrl,
        purchaseAmount,
      });
    }

    return deals;
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
        return Number(type) as unknown as JumboDealType;
      }
    }
  }
}
