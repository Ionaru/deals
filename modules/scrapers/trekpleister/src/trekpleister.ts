import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";

import { trekpleisterDealInformation, TrekpleisterDealType } from "./deals.js";

const ignoredDeals = new Set([
  // Gratis verzending
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8MTQxMTN8aW1hZ2UvcG5nfGFEVTJMMmhqT0M4eU9UazVPRFV5TXpJeE9UazVPQXxiYzUxOTdiMzI5MzNhYTBjYmM1N2EyNzBlYWU3NjFlZjcyMzZkZGQ0NDY3NzdlNjI5YmQ3ODA2ZGMwNWI5Njdl",

  // Met gratis artikel
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8MTUzNjl8aW1hZ2UvcG5nfGFHWmpMMmcwTUM4eU9UazBPRGt5T0RneE9USXpNQXw5Y2I1ZjdlODI4ZDhmN2JkNjZmZmZiMzA1OGEwODI1NWNkMjhiYTAzOWI4OTUxZWJlMzMwOTM4MmVkM2NlOGNk",
]);

const parseProductPrice = (priceText: string | null = ""): number => {
  const priceParts = priceText?.split("\n").map((part) => part.trim()) ?? [];
  return Number(priceParts.join("") || 0);
};

export class Trekpleister extends ScrapeWebsiteService {
  shopName = "Trekpleister";

  protected baseUrl = "https://www.trekpleister.nl";
  protected paths = [
    "/baby",
    "/beauty",
    "/fashion",
    "/elektronica",
    "/speelgoed",
    "/verzorging",
    "/gezondheid",
    "/huishouden",
    "/search?q=",
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
            trekpleisterDealInformation[dealCode].calculation(priceText) * 100,
          ) / 100,
        imageUrl: this.baseUrl + productImage || "",
        name: text?.trim() ?? "Unknown product",
        price: priceText,
        productUrl,
        purchaseAmount: trekpleisterDealInformation[dealCode].purchaseAmount,
        requiresCard:
          trekpleisterDealInformation[dealCode].requiresCard ?? false,
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

  #getDealCodeFromSrc(source: string): TrekpleisterDealType | void {
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

  #getDealTypeFromCode(codeText: string): TrekpleisterDealType | void {
    const dealType = Object.entries(trekpleisterDealInformation).find(
      (value) => value[1].code === codeText,
    );

    if (dealType) {
      return dealType[0] as unknown as TrekpleisterDealType;
    }
  }
}
