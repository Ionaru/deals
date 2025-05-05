import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component.js";

@Component({
  imports: [ToolbarIconButtonComponent, MatIconModule, MatMenuModule],
  selector: "deals-deal-problem-button",
  templateUrl: "./deal-problem-button.component.html",
})
export class DealProblemButtonComponent {
  readonly dealId = input.required<string>();
}
