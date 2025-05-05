import { DealDTO } from "../entities/deal.js";
import { IDealsRequest } from "../routes/get-deals.js";
import { HealthResponse, IHealthRequest } from "../routes/get-health.js";
import {
  IScraperStatusRequest,
  IScraperStatusResponse,
} from "../routes/get-scraper-status.js";

export interface IRequest {
  "v1/health": {
    request: IHealthRequest;
    response: HealthResponse[];
  };

  "v1/scraper-status": {
    request: IScraperStatusRequest;
    response: IScraperStatusResponse;
  };

  "v1/deals": {
    request: IDealsRequest;
    response: DealDTO[];
  };
}
