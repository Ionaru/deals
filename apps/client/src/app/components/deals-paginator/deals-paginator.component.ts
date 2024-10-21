import { Component, input, output } from "@angular/core";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";

import { DealsPaginatorI18nProvider } from "./deals-paginator-i18n.provider";

@Component({
  imports: [MatPaginatorModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: DealsPaginatorI18nProvider },
  ],
  selector: "deals-deals-paginator",
  standalone: true,
  styleUrl: "./deals-paginator.component.css",
  templateUrl: "./deals-paginator.component.html",
})
export class DealsPaginatorComponent {
  readonly totalItems = input.required<number>();
  readonly itemsPerPage = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly page = output<PageEvent>()

  handlePageEvent($event: PageEvent) {
    this.page.emit($event);
  }
}
