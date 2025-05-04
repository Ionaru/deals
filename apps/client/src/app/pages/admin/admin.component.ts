import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  NgOptimizedImage,
} from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { share } from "rxjs";

import { UnknownDealsComponent } from "../../components/unknown-deals/unknown-deals.component";
import { TimePipe } from "../../pipes/time.pipe";
import { HealthService } from "../../services/health.service";

@Component({
  imports: [
    MatButtonModule,
    JsonPipe,
    AsyncPipe,
    MatCardModule,
    NgOptimizedImage,
    DatePipe,
    TimePipe,
    MatProgressSpinnerModule,
    UnknownDealsComponent,
  ],
  styleUrls: ["./admin.component.css"],
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnDestroy {
  readonly #healthService = inject(HealthService);

  healthUptimeInterval?: ReturnType<typeof setInterval>;

  health$ = this.#healthService.services$.pipe(share());

  ngOnDestroy(): void {
    if (this.healthUptimeInterval) {
      clearInterval(this.healthUptimeInterval);
    }
  }

  isCoreService(service: { type: string }): boolean {
    return service.type === "CORE";
  }

  startScraper(scraperName: string) {
    this.#healthService.startScraper$(scraperName).subscribe();
  }
}
