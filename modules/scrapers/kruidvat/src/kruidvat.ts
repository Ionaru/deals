import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";

import { kruidvatDealInformation, KruidvatDealType } from "./deals.js";

const ignoredDeals = new Set([
  "1404",
  "1142",
  "1447",
  "4252",
  "4302",
  "4108",
  "4939",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjIwM3xpbWFnZS9wbmd8YUdFMUwyaGxPQzh6TXpjeE56azBOVEEzTXpZNU5BfDBjZjFiYTBkMWE0Zjk5OGJmMTBlYzJlZTRhNjZiMmVjM2M2OTZkMzA2YWI4NmMzN2UxMWYzOTZkMDNhOGE1MDA",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDEyMHxpbWFnZS9wbmd8YURBMUwyZzJaQzh6TXpneE1qTTFOVGd3T1RNeE1BfDg2ODFjN2Y0NTc0MmI4YmI5YjVmOGI5NjllYTg5NGI4ZDNmMGU2Y2M2MjQ3NjdjZmU4NWQ5YmYxMzU4ODAzYTg",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDEzM3xpbWFnZS9wbmd8YURRMEwyZzJZeTh6TXpneE1qTTFOVGczTkRnME5nfDVhYTJmZmNmNGU2ZjgxNTE1NWQwNTAxZTQzYjU2YTk3MjViMjY4NjY1ZDRjMmE4OTUzOGRjY2Y4Y2I3M2Y0ZDA",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDMwNHxpbWFnZS9wbmd8YURZekwyZzRNUzh6TXpneE1qTTFOVEl4T1RRNE5nfDEwOGNlNmIyNzliZTliNzA3ZTk2YmE2N2EyZGYxY2JjYzlhMTMxYWIwOGIwNDY3NjkwN2FkNGRmZDJhNWFkYTc",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDAzMXxpbWFnZS9wbmd8YUdFeUwyZzRNQzh6TXpneE1qTTFOVEk0TlRBeU1nfDE2NjEzNDE1NWZkNGVjYmIzMzQ5NWZhMjVmYTIwMGEzNmFiZTBmZjAxYjZkZGIwNjlhNTAzMzQ1YWRjYWRmZDE",
]);

const parseProductPrice = (priceText: string | null = ""): number => {
  const priceParts = priceText?.split("\n").map((part) => part.trim()) ?? [];
  return Number(priceParts.join("") || 0);
};

export class Kruidvat extends ScrapeWebsiteService {
  shopName = "Kruidvat";

  protected baseUrl = "https://www.kruidvat.nl";
  protected paths = [
    "/baby",
    "/beauty",
    "/beauty/fohn-haarstyler/c/20014",
    "/beauty/geuren-geschenksets/c/20017",
    "/beauty/geuren-geschenksets/geschenksets/c/30030",
    "/beauty/haaraccessoires/c/20015",
    "/beauty/haarverzorging/c/20013",
    "/beauty/haarverzorging/curly-girl-methode/c/haarverzorging",
    "/beauty/luxe-beauty/c/luxe-beauty",
    "/beauty/make-up-accessoires/c/20090",
    "/beauty/make-up/c/20018",
    "/beauty/nieuw-in-beauty/c/MLP10066",
    "/beauty/skincare-man/c/20020",
    "/beauty/skincare-vrouw/c/20019",
    "/beauty/voordeelverpakkingen-beauty/c/MLP10083",
    "/beauty/zonnebrand-aftersun/c/30060",
    "/elektronica",
    "/eten-en-drinken",
    "/fashion",
    "/gezondheid",
    "/huishouden",
    "/speelgoed",
    "/sport",
    "/verzorging",
    "/verzorging/duurzamere-keuze/alle-duurzamere-beautyproducten/c/MLP10139",
    "/verzorging/duurzamere-keuze/alle-duurzamere-verzorgingsproducten/c/MLP10138",
    "/verzorging/intieme-verzorging/inlegkruisjes",
    "/verzorging/lichaamsverzorging/bad-en-douche-producten/c/30057",
    "/verzorging/lichaamsverzorging/c/20021",
    "/verzorging/lichaamsverzorging/deodorant/c/30056",
    "/verzorging/lichaamsverzorging/handzeep-handgel/c/30062",
    "/verzorging/mannen-verzorging/c/MLP10060",
    "/verzorging/mondverzorging/c/20012",
    "/verzorging/natuurlijke-producten/c/groen-lichaamsverzorging",
    "/verzorging/scheren-ontharen/c/20022",
    "/verzorging/scheren-ontharen/scheermesjes/c/30070",
    "/verzorging/zonbescherming/zonnebrand",
    "/voordeelverpakkingen-verzorging/c/MLP10081",
  ];

  protected setPage(url: URL, page: number): URL {
    url.searchParams.set("page", page.toString());
    return url;
  }

  protected getPageAmount(document: Document): number {
    const pagerText = document.querySelector(".pager__range")?.textContent;
    return pagerText ? this.#getPagerNumbers(pagerText) : 0;
  }

  protected modifyURL(url: URL): URL {
    url.searchParams.set("size", "100");
    url.searchParams.set("sort", "name-asc");
    return url;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  protected getPageDeals(document: Document): IProductDeal[] {
    const deals: IProductDeal[] = [];

    const productList = document.querySelector("#productList");

    if (!productList) {
      return deals;
    }

    const products = [...productList.querySelectorAll(":scope > *")];

    for (const product of products) {
      const productDealImage = product.querySelector("img.roundel__img");
      if (!productDealImage) {
        continue;
      }

      const partnerSale = product.querySelector(".tile__badge");
      if (partnerSale?.innerHTML.includes("Verkoop via partner")) {
        continue;
      }

      // eslint-disable-next-line unicorn/prefer-dom-node-dataset
      const deal = productDealImage.getAttribute("data-src");
      if (!deal) {
        continue;
      }

      const title = product.querySelector("a.tile__product-slide-product-name");
      if (!title) {
        continue;
      }

      const productUrl = `${this.baseUrl}${title.getAttribute("href")}`;

      const dealCode = this.#getDealCodeFromSrc(deal);
      if (!dealCode) {
        const dealNumber = deal.split("/").at(-1)?.split(".").at(0);
        if (dealNumber && ignoredDeals.has(dealNumber)) {
          continue;
        }

        const context = this.#getContext(deal);

        if (context) {
          if (ignoredDeals.has(context)) {
            continue;
          }

          const contextCode = this.#decodeContext(context);
          if (contextCode && ignoredDeals.has(contextCode)) {
            continue;
          }
        }

        this.reportUnknownDeal({
          productUrl,
          promotionText: deal.split("/").at(-1) ?? "Unknown Deal",
        });
        continue;
      }

      let text = title.textContent?.trim();
      const description = product
        .querySelector(".tile__product-slide-product-description")
        ?.textContent?.trim();
      if (description) {
        text = `${text} - ${description}`;
      }

      const productPrice = product.querySelector(".pricebadge__new-price");
      const priceText = parseProductPrice(productPrice?.textContent);
      const productImage =
        product
          .querySelector("img.tile__product-slide-image")
          ?.getAttribute("data-src") ??
        product
          .querySelector("img.tile__product-slide-image")
          ?.getAttribute("src");

      deals.push({
        dealPrice:
          // Deal prices are rounded down when they are not whole cents.
          Math.floor(
            kruidvatDealInformation[dealCode].calculation(priceText) * 100,
          ) / 100,
        imageUrl: this.baseUrl + productImage || "",
        name: text?.trim() ?? "Unknown product",
        price: priceText,
        productUrl,
        purchaseAmount: kruidvatDealInformation[dealCode].purchaseAmount,
      });
    }

    return deals;
  }

  #getPagerNumbers(pagerText: string): number {
    const pagerParts = pagerText.split("\n") || [];
    const pages = pagerParts
      .map((part) => part.trim())
      .filter((part) => /^\d+$/.exec(part));
    const lastPage = pages.at(-1);
    return Number(lastPage ?? 0);
  }

  #getDealCodeFromSrc(source: string): KruidvatDealType | void {
    const dealCode = /\/(\d*)\.png/.exec(source);
    if (dealCode?.[1]) {
      return this.#getDealTypeFromCode(dealCode[1]);
    }

    const context = this.#getContext(source);
    if (context) {
      const dealType = this.#getDealTypeFromCode(context);
      if (dealType) {
        return dealType;
      }

      const contextCode = this.#decodeContext(context);
      if (contextCode) {
        return this.#getDealTypeFromCode(contextCode);
      }
    }
  }

  #getContext(source: string): string | undefined {
    const dealContext = /context=(.*)/.exec(source);
    return dealContext?.at(1);
  }

  #decodeContext(contextText: string): string | void {
    const context = Buffer.from(contextText, "base64").toString("ascii");
    const contextCodeMatch = /\|(\d*)\|/.exec(context);
    if (contextCodeMatch?.at(1)) {
      return contextCodeMatch.at(1);
    }
  }

  #getDealTypeFromCode(codeText: string): KruidvatDealType | void {
    const dealType = Object.entries(kruidvatDealInformation).find(
      (value) => value[1].code === codeText,
    );

    if (dealType) {
      return dealType[0] as unknown as KruidvatDealType;
    }
  }
}
