import { DealDTO } from "../entities/deal";
import { IDealsRequest } from "../routes/get-deals";
import { HealthResponse, IHealthRequest } from "../routes/get-health";
import {
  IScraperStatusRequest,
  IScraperStatusResponse,
} from "../routes/get-scraper-status";

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
