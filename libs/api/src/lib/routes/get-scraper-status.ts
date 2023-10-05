import { ScraperStatus } from "../common/scraper-status";

export type IScraperStatusRequest = Record<string, never>;

export interface IScraperStatusResponse {
  [key: string]: {
    status: ScraperStatus;
  };
}
