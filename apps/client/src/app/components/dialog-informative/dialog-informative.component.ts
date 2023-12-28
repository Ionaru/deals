import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";

export interface DialogInformativeData {
  title: string;
  message: string;
}

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  selector: "deals-dialog-informative",
  standalone: true,
  styleUrl: "./dialog-informative.component.css",
  templateUrl: "./dialog-informative.component.html",
})
export class DialogInformativeComponent {
  data = inject<DialogInformativeData>(MAT_DIALOG_DATA);

  static open(
    dialog: MatDialog,
    config: MatDialogConfig<DialogInformativeData>,
  ) {
    return dialog.open(DialogInformativeComponent, config);
  }
}
