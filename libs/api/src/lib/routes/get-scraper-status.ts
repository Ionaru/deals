import { ScraperStatus } from "../common/scraper-status";

export type IScraperStatusRequest = Record<string, never>;

export type IScraperStatusResponse = Record<
  string,
  {
    status: ScraperStatus;
  }
>;
