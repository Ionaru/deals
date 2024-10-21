import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  selector: "deals-toolbar-link",
  standalone: true,
  styleUrl: "./toolbar-link.component.css",
  templateUrl: "./toolbar-link.component.html",
})
export class ToolbarLinkComponent {
  readonly href = input.required<string>();
  readonly name = input.required<string>();
}
