import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";

import { ToolbarIconButtonComponent } from "../toolbar-icon-button/toolbar-icon-button.component.js";

@Component({
  imports: [
    MatIconModule,
    MatMenuModule,
    ToolbarIconButtonComponent,
    MatTooltipModule,
  ],
  selector: "deals-toolbar-language-switch",
  styleUrl: "./toolbar-language-switch.component.css",
  templateUrl: "./toolbar-language-switch.component.html",
})
export class ToolbarLanguageSwitchComponent {}
