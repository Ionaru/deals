import { inject, Injectable } from '@angular/core';

import { GatewayService } from './gateway.service';

@Injectable({
    providedIn: 'root',
})
export class ScraperStatusService {
    readonly #gateway = inject(GatewayService);

    public getScraperStatus() {
        return this.#gateway.get('v1/scraper-status', {});
    }
}
