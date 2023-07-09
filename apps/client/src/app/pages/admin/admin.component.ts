import {
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
} from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { share, tap } from 'rxjs';

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
        MatProgressSpinnerModule,
    ],
    selector: 'deals-admin',
    standalone: true,
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnDestroy {
    readonly #healthService = inject(HealthService);

    healthUptimeInterval?: ReturnType<typeof setInterval>;

    health$ = this.#healthService.health$.pipe(
        share(),
        tap((health) => {
            this.healthUptimeInterval = setInterval(() => {
                for (const service of health) {
                    if (service.status.uptime !== undefined) {
                        service.status.uptime++;
                    }
                }
            }, 1000);
        }),
    );

    public ngOnDestroy(): void {
        if (this.healthUptimeInterval) {
            clearInterval(this.healthUptimeInterval);
        }
    }

    isCoreService(service: { type: string }): boolean {
        return service.type === 'core';
    }
}
