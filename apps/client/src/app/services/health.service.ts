import { inject, Injectable } from '@angular/core';
import { share } from 'rxjs';

import { GatewayService } from './gateway.service';

@Injectable({
    providedIn: 'root',
})
export class HealthService {
    readonly #gateway = inject(GatewayService);

    readonly #health$ = this.#gateway.get('v1/health', {}).pipe(share());

    public getHealth() {
        return this.#health$;
    }
}
