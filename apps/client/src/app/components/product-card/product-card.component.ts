import { NgClass, NgOptimizedImage } from "@angular/common";
import { Component, inject, input, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

import { DealImageComponent } from "../deal-image/deal-image.component.js";
import { DialogInformativeComponent } from "../dialog-informative/dialog-informative.component.js";
import { PriceCurrentComponent } from "../price-current/price-current.component.js";
import { SpacerComponent } from "../spacer/spacer.component.js";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component.js";

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
    ToolbarIconButtonComponent,
    MatDividerModule,
    RouterLink,
    SpacerComponent,
    PriceCurrentComponent,
    MatTooltipModule,
    NgClass,
    DealImageComponent,
  ],
  selector: "deals-product-card",
  styleUrl: "./product-card.component.css",
  templateUrl: "./product-card.component.html",
})
export class ProductCardComponent {
  readonly productId = input.required<string>();
  readonly productImageUrl = input.required<string>();
  readonly productName = input.required<string>();
  readonly productPrice = input.required<number>();
  readonly productUrl = input.required<string>();
  readonly shopName = input.required<string>();

  readonly #dialog = inject(MatDialog);

  broken$$ = signal(false);

  openDialog() {
    this.broken$$.set(true);
    DialogInformativeComponent.open(this.#dialog, {
      data: {
        message: $localize`This feature is not implemented yet.`,
        title: $localize`Not implemented`,
      },
    });
  }
}
