import { ScraperStatus } from "../common/scraper-status.js";

export type IScraperStatusRequest = Record<string, never>;

export type IScraperStatusResponse = Record<
  string,
  {
    status: ScraperStatus;
  }
>;
