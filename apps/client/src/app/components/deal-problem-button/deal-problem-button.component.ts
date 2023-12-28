import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component";

@Component({
  imports: [ToolbarIconButtonComponent, MatIconModule, MatMenuModule],
  selector: "deals-deal-problem-button",
  standalone: true,
  styleUrl: "./deal-problem-button.component.css",
  templateUrl: "./deal-problem-button.component.html",
})
export class DealProblemButtonComponent {
  @Input({ required: true }) dealId!: string;
}
