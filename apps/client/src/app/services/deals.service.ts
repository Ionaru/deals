import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';

import { typedGql } from '../zeus/typedDocumentNode';

@Injectable({
    providedIn: 'root',
})
export class DealsService {
    readonly #apollo = inject(Apollo);

    public getDeals(page = 1) {
        return this.#apollo
            .query({
                query: typedGql('query')({
                    deals: [
                        {
                            page,
                        },
                        {
                            items: {
                                dealPrice: true,
                                dealQuantity: true,
                                id: true,
                                product: {
                                    imageUrl: true,
                                    name: true,
                                    price: true,
                                    productUrl: true,
                                    shop: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    ],
                }),
            })
            .pipe(map((result) => result.data.deals.items));
    }
}
