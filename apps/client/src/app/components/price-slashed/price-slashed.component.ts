import { Component, Input } from "@angular/core";

import { PriceComponent } from "../price/price.component";

@Component({
  imports: [PriceComponent],
  selector: "deals-price-slashed",
  standalone: true,
  styleUrl: "./price-slashed.component.css",
  template: '<deals-price [amount]="amount" />',
})
export class PriceSlashedComponent {
  @Input({ required: true }) amount!: number;
}
