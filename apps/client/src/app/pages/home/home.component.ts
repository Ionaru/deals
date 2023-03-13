import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { map, Observable } from 'rxjs';

import { DealsService } from '../../services/deals.service';

@Component({
    imports: [CommonModule, MatCardModule, MatButtonModule],
    selector: 'deals-home',
    standalone: true,
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    #dealsService = inject(DealsService);

    public deals?: Observable<any>;

    public ngOnInit() {
        this.deals = this.#dealsService.getDeals().pipe(
            map((deals) => deals.deals),
        );
    }

    public trackDealsBy(_index: number, deal: any) {
        return deal.id;
    }

}
