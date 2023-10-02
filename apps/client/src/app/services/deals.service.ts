import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { withApolloErrorHandling } from '../utils/observables';
import { typedGql } from '../zeus/typedDocumentNode';

@Injectable({
    providedIn: 'root',
})
export class DealsService {
    readonly #apollo = inject(Apollo);

    public getDeals(page = 1) {
        return withApolloErrorHandling(
            this.#apollo.query({
                errorPolicy: 'all',
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
            }),
        );
    }
}
