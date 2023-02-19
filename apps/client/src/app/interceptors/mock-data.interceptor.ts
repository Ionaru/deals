import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { IHTTPAPI } from '@deals/api';
import { Observable, of } from 'rxjs';

import getHealth from '../../mock-data/get-health';

/**
 * Intercepts requests and returns mock data used for easier development.
 * Any imported mock data will be tree-shaken out of the production build.
 */
export const mockDataInterceptor = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
    // eslint-disable-next-line no-console
    console.warn('MockDataInterceptor', request.url);

    if (request.method === 'GET' && request.url.endsWith('/api/v1/health')) {
        return of(
            new HttpResponse<IHTTPAPI['v1/health']['response']>({
                body: getHealth,
            }),
        );
    }

    return next(request);
};
