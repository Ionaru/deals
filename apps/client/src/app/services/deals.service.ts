import { inject, Injectable } from '@angular/core';
import { GatewayService } from './gateway.service';

@Injectable({
    providedIn: 'root',
})
export class DealsService {

    readonly #gateway = inject(GatewayService);

    public getDeals() {
        return this.#gateway.get('v1/deals', {});
    }

}
