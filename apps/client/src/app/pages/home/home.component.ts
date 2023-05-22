import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IDeal } from '@deals/api';
import { map, Observable } from 'rxjs';

import { DealsService } from '../../services/deals.service';

@Component({
    imports: [CommonModule, MatCardModule, MatButtonModule, NgOptimizedImage],
    selector: 'deals-home',
    standalone: true,
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public deals!: Observable<IDeal[]>;

    #dealsService = inject(DealsService);

    public ngOnInit() {
        this.deals = this.#dealsService
            .getDeals()
            .pipe(map((deals) => deals.deals));
    }

    public trackDealsBy(_index: number, deal: any) {
        return deal.id;
    }
}
