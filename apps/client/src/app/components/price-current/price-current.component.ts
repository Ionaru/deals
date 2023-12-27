import { Component, Input } from "@angular/core";

import { PriceComponent } from "../price/price.component";

@Component({
  imports: [PriceComponent],
  selector: "deals-price-current",
  standalone: true,
  styleUrl: "./price-current.component.css",
  template: '<deals-price [amount]="amount" />',
})
export class PriceCurrentComponent {
  @Input({ required: true }) amount!: number;
}
