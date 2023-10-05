import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  // HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";

// import getDeals from '../../mock-data/get-deals';
// import getHealth from '../../mock-data/get-health';

/**
 * Intercepts requests and returns mock data used for easier development.
 * Any imported mock data will be tree-shaken out of the production build.
 */
export const mockDataInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  // eslint-disable-next-line no-console
  console.warn("MockDataInterceptor", request.url);

  // if (request.method === 'GET' && request.url.endsWith('/api/v1/health')) {
  //     return of(
  //         new HttpResponse<IHTTPAPI['v1/health']['response']>({
  //             body: getHealth,
  //         }),
  //     );
  // }

  // if (request.method === 'GET' && request.url.endsWith('/api/v1/deals')) {
  //     return of(
  //         new HttpResponse<IHTTPAPI['v1/deals']['response']>({
  //             body: getDeals,
  //         }),
  //     );
  // }

  return next(request);
};
