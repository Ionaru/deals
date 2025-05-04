import { IProductDeal, IUnknownDeal } from "@deals/api";
import { uniquifyObjectsArray } from "@ionaru/array-utils";
import { Injectable, Logger } from "@nestjs/common";
import { JSDOM } from "jsdom";

import { StorageService } from "./storage.service.js";

@Injectable()
export abstract class ScrapeWebsiteService {
  readonly #logger = new Logger(ScrapeWebsiteService.name);

  abstract shopName: string;

  protected abstract baseUrl: string;
  protected abstract paths: string[];

  constructor(private readonly storage: StorageService) {}

  async scrape() {
    const deals: IProductDeal[] = [];

    this.#logger.log(`Scraping ${this.shopName}...`);

    for (const path of this.paths) {
      const pathDeals = await this.scrapePath(path);
      deals.push(...pathDeals);
    }

    const uniqueDeals = uniquifyObjectsArray(deals, (deal) => deal.productUrl);
    this.#logger.log(`Found ${uniqueDeals.length} deals.`);
    return uniqueDeals;
  }

  protected reportUnknownDeal(unknownDeal: IUnknownDeal) {
    // this.#logger.log(`Storing unknown deal for ${this.shopName}...`);
    this.storage
      .storeUnknownDeal({
        deal: unknownDeal,
        shop: this.shopName,
      })
      .catch((error) => {
        this.#logger.error("Failed to store unknown deal.", error);
      });
  }

  async scrapePath(path: string): Promise<IProductDeal[]> {
    const deals = [];
    const firstPageUrl = this.#buildPageUrl(path, 0);
    const document = await this.#getPage(firstPageUrl);
    const pages = this.getPageAmount(document);
    this.#logger.log(`Path ${path} has ${pages} extra page(s).`);
    const url = this.#buildUrl(path);

    for (let page = 0; page <= pages; page++) {
      const pageUrl = this.setPage(url, page);
      const pageDeals = await this.#scrapePage(
        pageUrl,
        page === 0 ? document : undefined,
      );
      deals.push(...pageDeals);
    }

    return deals;
  }

  async #getPage(url: URL): Promise<Document> {
    const modifiedUrl = this.modifyURL(url);
    this.#logger.log(`Fetching: ${modifiedUrl}`);
    const result = await fetch(modifiedUrl);
    const html = await result.text();
    return new JSDOM(html).window.document;
  }

  #buildPageUrl(path: string, page: number): URL {
    return this.setPage(this.#buildUrl(path), page);
  }

  async #scrapePage(
    url: URL,
    fetchedDocument?: Document,
  ): Promise<IProductDeal[]> {
    if (!fetchedDocument) {
      const pageDocument = await this.#getPage(url);
      return this.getPageDeals(pageDocument);
    }
    return this.getPageDeals(fetchedDocument);
  }

  #buildUrl(path: string): URL {
    return new URL(path, this.baseUrl);
  }

  protected abstract setPage(url: URL, page: number): URL;
  protected abstract getPageAmount(page: Document): number;

  protected abstract getPageDeals(page: Document): IProductDeal[];

  protected abstract modifyURL(url: URL): URL;
}
