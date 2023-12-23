import { Component, EventEmitter, Input, Output } from "@angular/core";
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
  @Input({ required: true }) totalItems!: number;
  @Input({ required: true }) itemsPerPage!: number;
  @Input({ required: true }) currentPage!: number;
  @Output() page = new EventEmitter<PageEvent>();

  handlePageEvent($event: PageEvent) {
    this.page.emit($event);
  }
}
