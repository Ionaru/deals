import {
    AsyncPipe,
    DecimalPipe,
    JsonPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DealsService } from '../../services/deals.service';

@Component({
    imports: [
        MatCardModule,
        MatButtonModule,
        NgOptimizedImage,
        NgIf,
        NgForOf,
        AsyncPipe,
        DecimalPipe,
        JsonPipe,
    ],
    selector: 'deals-home',
    standalone: true,
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    deals$!: ReturnType<DealsService['getDeals']>;

    page = 1;

    readonly #dealsService = inject(DealsService);

    ngOnInit() {
        this.deals$ = this.#dealsService.getDeals(this.page);
    }

    trackDealsBy(_index: number, deal: any) {
        return deal.id;
    }
}
