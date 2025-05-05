import { Component, input } from "@angular/core";

import { PriceComponent } from "../price/price.component.js";

@Component({
  imports: [PriceComponent],
  selector: "deals-price-current",
  template: '<deals-price [amount]="amount()" />',
})
export class PriceCurrentComponent {
  readonly amount = input.required<number>();
}
