import {
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { interval, map, share, switchMap, tap } from 'rxjs';

import { TimePipe } from '../../pipes/time.pipe';
import { HealthService } from '../../services/health.service';

@Component({
    imports: [
        MatButtonModule,
        JsonPipe,
        AsyncPipe,
        MatCardModule,
        NgForOf,
        NgOptimizedImage,
        NgIf,
        DatePipe,
        TimePipe,
    ],
    selector: 'deals-admin',
    standalone: true,
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html',
})
export class AdminComponent {
    readonly #healthService = inject(HealthService);

    public health = this.#healthService.getHealth().pipe(
        switchMap((health) =>
            interval(1000).pipe(
                tap(() => {
                    for (const service of health) {
                        if (service.status.uptime !== undefined) {
                            service.status.uptime++;
                        }
                    }
                }),
                map(() => health),
            ),
        ),
        share(),
    );
}
