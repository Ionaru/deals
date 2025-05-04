import { Component, input } from "@angular/core";

import { PriceComponent } from "../price/price.component.js";

@Component({
  imports: [PriceComponent],
  selector: "deals-price-current",
  styleUrl: "./price-current.component.css",
  template: '<deals-price [amount]="amount()" />',
})
export class PriceCurrentComponent {
  readonly amount = input.required<number>();
}
