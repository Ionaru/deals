import { DecimalPipe } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
  imports: [DecimalPipe],
  selector: "deals-price",
  standalone: true,
  styleUrl: "./price.component.css",
  template: '€ {{amount() | number: "1.2-2"}}',
})
export class PriceComponent {
  readonly amount = input.required<number>();
}
