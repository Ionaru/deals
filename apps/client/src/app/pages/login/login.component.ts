/* eslint-disable sort-keys,no-console */
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AuthService } from "../../services/auth.service";

enum LoginState {
  INITIAL,
  LOGIN,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_ERROR,
  REGISTERING,
  REGISTERED,
}

@Component({
  selector: "deals-login",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  state = LoginState.INITIAL;
  states = LoginState;

  createdName?: string;

  form: FormGroup = new FormGroup({
    displayName: new FormControl(""),
  });

  readonly #authService = inject(AuthService);

  async startRegister() {
    this.state = LoginState.REGISTER;
  }

  async register() {
    this.state = LoginState.REGISTERING;
    try {
      const credential = await this.#authService.register(
        this.form.get("displayName")?.value,
      );
      console.log("credential", credential);
      if (credential) {
        this.createdName = credential;
        this.state = LoginState.REGISTERED;
      }
    } catch {
      this.state = LoginState.LOGIN_ERROR;
    }
  }

  async startLogin() {
    this.state = LoginState.LOGIN;

    try {
      const assertion = await this.#authService.login();
      if (assertion) {
        this.state = LoginState.INITIAL;
        const u = await this.#authService.getUser();
        console.log(u.data.user);
      }
    } catch {
      this.state = LoginState.LOGIN_ERROR;
    }
  }

  back() {
    this.state = LoginState.INITIAL;
  }
}
