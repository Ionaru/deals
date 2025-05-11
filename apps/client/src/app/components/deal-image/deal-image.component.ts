import { NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
  imports: [NgOptimizedImage],
  selector: "deals-deal-image",
  styleUrl: "./deal-image.component.css",
  templateUrl: "./deal-image.component.html",
})
export class DealImageComponent {
  productImageUrl = input.required<string>();
  productName = input.required<string>();
}
