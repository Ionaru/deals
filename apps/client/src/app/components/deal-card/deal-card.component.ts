import {
  DecimalPipe,
  NgClass,
  NgOptimizedImage,
  PercentPipe,
} from "@angular/common";
import { Component, computed, inject, Input, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

import { DealProblemButtonComponent } from "../deal-problem-button/deal-problem-button.component";
import { DialogInformativeComponent } from "../dialog-informative/dialog-informative.component";
import { PriceComponent } from "../price/price.component";
import { PriceCurrentComponent } from "../price-current/price-current.component";
import { PriceSlashedComponent } from "../price-slashed/price-slashed.component";
import { SpacerComponent } from "../spacer/spacer.component";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";

@Component({
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
    ToolbarIconButtonComponent,
    MatDividerModule,
    RouterLink,
    SpacerComponent,
    PriceSlashedComponent,
    PriceCurrentComponent,
    PriceComponent,
    DealProblemButtonComponent,
    MatTooltipModule,
    PercentPipe,
    NgClass,
  ],
  selector: "deals-deal-card",
  standalone: true,
  styleUrl: "./deal-card.component.css",
  templateUrl: "./deal-card.component.html",
})
export class DealCardComponent {
  @Input({ required: true }) dealId!: string;
  @Input({ required: true }) dealPrice!: number;
  @Input({ required: true }) dealQuantity!: number;
  @Input({ required: true }) productName!: string;
  @Input({ required: true }) productUrl!: string;
  @Input({ required: true }) productImageUrl!: string;
  @Input({ required: true }) productPrice!: number;
  @Input({ required: true }) shopName!: string;

  readonly #dialog = inject(MatDialog);

  broken$$ = signal(false);

  savings$$ = computed(() => this.calculateSavings());
  savingsPercentage$$ = computed(() => this.calculateSavingsPercentage());

  openDialog() {
    this.broken$$.set(true);
    DialogInformativeComponent.open(this.#dialog, {
      data: {
        message: $localize`This feature is not implemented yet.`,
        title: $localize`Not implemented`,
      },
    });
  }

  calculateSavings() {
    return (
      this.productPrice * this.dealQuantity - this.dealPrice * this.dealQuantity
    );
  }

  calculateSavingsPercentage() {
    return (
      ((this.dealPrice * this.dealQuantity -
        this.productPrice * this.dealQuantity) /
        (this.productPrice * this.dealQuantity)) *
      -1
    );
  }
}
