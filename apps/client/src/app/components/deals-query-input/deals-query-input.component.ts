import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: "deals-deals-query-input",
  styleUrl: "./deals-query-input.component.css",
  templateUrl: "./deals-query-input.component.html",
})
export class DealsQueryInputComponent implements OnInit, OnChanges {
  queryControl = new FormControl("", [
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  readonly query = input<string | null>();
  readonly queryChange = output<string | null>();

  ngOnInit() {
    if (this.query) {
      this.queryControl.setValue(this.query() ?? null);
      this.queryControl.markAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      "query" in changes &&
      this.queryControl.value !== changes["query"].currentValue
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.queryControl.setValue(changes["query"].currentValue);
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
