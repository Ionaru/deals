import { NgClass, NgOptimizedImage, PercentPipe } from "@angular/common";
import { Component, computed, inject, input, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";

import { DealImageComponent } from "../deal-image/deal-image.component.js";
import { DealProblemButtonComponent } from "../deal-problem-button/deal-problem-button.component.js";
import { DialogInformativeComponent } from "../dialog-informative/dialog-informative.component.js";
import { PriceComponent } from "../price/price.component.js";
import { PriceCurrentComponent } from "../price-current/price-current.component.js";
import { PriceSlashedComponent } from "../price-slashed/price-slashed.component.js";
import { SpacerComponent } from "../spacer/spacer.component.js";
import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component.js";

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
    ToolbarIconButtonComponent,
    MatDividerModule,
    SpacerComponent,
    PriceSlashedComponent,
    PriceCurrentComponent,
    PriceComponent,
    DealProblemButtonComponent,
    MatTooltipModule,
    PercentPipe,
    NgClass,
    DealImageComponent,
  ],
  selector: "deals-deal-card",
  styleUrl: "./deal-card.component.css",
  templateUrl: "./deal-card.component.html",
})
export class DealCardComponent {
  readonly dealId = input.required<string>();
  readonly dealPrice = input.required<number>();
  readonly dealQuantity = input.required<number>();
  readonly requiresCard = input.required<boolean>();
  readonly productImageUrl = input.required<string>();
  readonly productName = input.required<string>();
  readonly productPrice = input.required<number>();
  readonly productUrl = input.required<string>();
  readonly shopName = input.required<string>();

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

  openLoyaltyCardDialog() {
    const shop = this.shopName();

    let message = $localize`${shop} requires a loyalty card to use this deal.`;
    if (shop === "Albert Heijn") {
      message = $localize`Albert Heijn requires a loyalty card make use of their discounts, you can get one at the checkout. Learn more here: https://www.ah.nl/mijn-ah/bonuskaart`;
    } else if (shop === "Kruidvat") {
      message = $localize`Kruidvat requires a Kruidvat Club account to make use of this discount, you can register online. Learn more here: https://www.kruidvat.nl/kruidvatclub`;
    }

    DialogInformativeComponent.open(this.#dialog, {
      data: {
        message,
        title: $localize`Loyalty card required`,
      },
    });
  }

  calculateSavings() {
    return (
      this.productPrice() * this.dealQuantity() -
      this.dealPrice() * this.dealQuantity()
    );
  }

  calculateSavingsPercentage() {
    return (
      ((this.dealPrice() * this.dealQuantity() -
        this.productPrice() * this.dealQuantity()) /
        (this.productPrice() * this.dealQuantity())) *
      -1
    );
  }
}
