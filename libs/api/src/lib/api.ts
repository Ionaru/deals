import { Observable } from "rxjs";

export type Async<T> = Promise<T> | Observable<T> | T;

export interface IProductDeal {
  name: string;
  imageUrl: string;
  price: number;
  productUrl: string;
  dealPrice: number;
  purchaseAmount: number;
  requiresCard: boolean;
}

export interface IUnknownDeal {
  promotionText: string;
  productUrl: string;
}

export enum ScraperStatus {
  IDLE = "IDLE",
  SCRAPING = "SCRAPING",
  ERROR = "ERROR",
}

export const network = Object.freeze({
  PRIMARY: Symbol("PRIMARY"),
  SCRAPER: Symbol("SCRAPER"),
});
