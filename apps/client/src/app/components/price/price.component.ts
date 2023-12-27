import { DecimalPipe } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  imports: [DecimalPipe],
  selector: "deals-price",
  standalone: true,
  styleUrl: "./price.component.css",
  template: '€ {{amount | number: "1.2-2"}}',
})
export class PriceComponent {
  @Input({ required: true }) amount!: number;
}
