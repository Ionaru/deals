import { DecimalPipe, NgOptimizedImage } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";

import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";

@Component({
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
    ToolbarIconButtonComponent,
    MatDividerModule,
  ],
  selector: "deals-deal-card",
  standalone: true,
  styleUrl: "./deal-card.component.css",
  templateUrl: "./deal-card.component.html",
})
export class DealCardComponent {
  @Input({ required: true }) dealPrice!: number;
  @Input({ required: true }) dealQuantity!: number;
  @Input({ required: true }) productName!: string;
  @Input({ required: true }) productUrl!: string;
  @Input({ required: true }) productImageUrl!: string;
  @Input({ required: true }) productPrice!: number;
}
