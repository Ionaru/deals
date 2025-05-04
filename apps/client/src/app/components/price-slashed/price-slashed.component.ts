import { Component, input } from "@angular/core";

import { PriceComponent } from "../price/price.component";

@Component({
  imports: [PriceComponent],
  selector: "deals-price-slashed",
  styleUrl: "./price-slashed.component.css",
  template: '<deals-price [amount]="amount()" />',
})
export class PriceSlashedComponent {
  readonly amount = input.required<number>();
}
