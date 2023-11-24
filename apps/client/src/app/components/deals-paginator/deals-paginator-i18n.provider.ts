import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class DealsPaginatorI18nProvider implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per pagina:`;
  lastPageLabel = `Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";

  getRangeLabel(page: number, pageSize: number, totalItems: number): string {
    if (totalItems === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(totalItems / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}
