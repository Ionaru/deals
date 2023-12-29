import { AsyncPipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: "deals-deals-query-input",
  standalone: true,
  styleUrl: "./deals-query-input.component.css",
  templateUrl: "./deals-query-input.component.html",
})
export class DealsQueryInputComponent implements OnInit {
  queryControl = new FormControl("", [
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  @Input() query: string | null = null;
  @Output() queryChange = new EventEmitter<string | null>();

  ngOnInit() {
    if (this.query) {
      this.queryControl.setValue(this.query);
      this.queryControl.markAsTouched();
    }
  }

  clearQuery() {
    this.queryControl.setValue("");
    this.outputChange();
  }

  outputChange() {
    if (this.queryControl.errors !== null) {
      return;
    }

    this.queryChange.emit(this.queryControl.value);
  }
}
