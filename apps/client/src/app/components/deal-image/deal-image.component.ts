import { NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  imports: [NgOptimizedImage, MatProgressSpinner],
  selector: "deals-deal-image",
  styleUrl: "./deal-image.component.css",
  templateUrl: "./deal-image.component.html",
})
export class DealImageComponent {
  productImageUrl = input.required<string>();
  productName = input.required<string>();
}
