import { IDealsRequest, IDealsResponse } from '../routes/get-deals';
import { IHealthRequest, IHealthResponse } from '../routes/get-health';
import {
    IScraperStatusRequest,
    IScraperStatusResponse,
} from '../routes/get-scraper-status';

export interface IRequest {
    'v1/health': {
        request: IHealthRequest;
        response: IHealthResponse;
    };

    'v1/scraper-status': {
        request: IScraperStatusRequest;
        response: IScraperStatusResponse;
    };

    'v1/deals': {
        request: IDealsRequest;
        response: IDealsResponse;
    };
}
