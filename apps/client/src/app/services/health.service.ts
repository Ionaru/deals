import { inject, Injectable } from '@angular/core';

import { GatewayService } from './gateway.service';

@Injectable({
    providedIn: 'root',
})
export class HealthService {
    readonly #gateway = inject(GatewayService);

    public getHealth() {
        return this.#gateway.get('v1/health', {});
    }
}
