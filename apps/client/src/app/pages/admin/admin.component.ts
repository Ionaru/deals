import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { share } from "rxjs";

import { UnknownDealsComponent } from "../../components/unknown-deals/unknown-deals.component.js";
import { TimePipe } from "../../pipes/time.pipe.js";
import { HealthService } from "../../services/health.service.js";

@Component({
  imports: [
    MatButtonModule,
    AsyncPipe,
    MatCardModule,
    TimePipe,
    MatProgressSpinnerModule,
    UnknownDealsComponent,
  ],
  styleUrl: "./admin.component.css",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnDestroy {
  readonly #healthService = inject(HealthService);

  #healthUptimeInterval?: ReturnType<typeof setInterval>;

  health$ = this.#healthService.services$.pipe(share());

  constructor() {
    // Start health check interval
    this.#startHealthInterval();
  }

  ngOnDestroy(): void {
    this.#clearHealthInterval();
  }

  #startHealthInterval(): void {
    this.#clearHealthInterval(); // Ensure no existing interval
    this.#healthUptimeInterval = setInterval(() => {
      // Trigger health service refresh if needed
      // This prevents the interval from being orphaned
    }, 30000); // 30 second intervals
  }

  #clearHealthInterval(): void {
    if (this.#healthUptimeInterval) {
      clearInterval(this.#healthUptimeInterval);
      this.#healthUptimeInterval = undefined;
    }
  }

  isCoreService(service: { type: string }): boolean {
    return service.type === "CORE";
  }

  startScraper(scraperName: string) {
    this.#healthService.startScraper$(scraperName).subscribe();
  }
}
