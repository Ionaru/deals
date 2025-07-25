import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: "deals-toolbar-icon-button",
  styleUrl: "./toolbar-icon-button.component.css",
  templateUrl: "./toolbar-icon-button.component.html",
})
export class ToolbarIconButtonComponent {
  readonly icon = input<string>();
}
