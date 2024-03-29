import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";

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
  imports: [
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  standalone: true,
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  state = LoginState.INITIAL;
  states = LoginState;

  createdName?: string;

  form: FormGroup = new FormGroup({
    displayName: new FormControl(""),
  });

  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  readonly isLoggedIn$ = this.#authService.isLoggedIn$;
  readonly user$ = this.#authService.user$;

  async startRegister() {
    this.state = LoginState.REGISTER;
  }

  async register(existingUser = false) {
    this.state = LoginState.REGISTERING;
    try {
      const credential = await this.#authService.register(
        this.form.get("displayName")?.value,
        existingUser,
      );
      if (credential && !existingUser) {
        this.createdName = credential;
        this.state = LoginState.REGISTERED;
      } else {
        this.state = LoginState.INITIAL;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.state = LoginState.LOGIN_ERROR;
    }
  }

  async startLogin() {
    this.state = LoginState.LOGIN;

    try {
      const assertion = await this.#authService.login();
      if (assertion) {
        this.state = LoginState.INITIAL;
        await this.#authService.getUser();
        this.#router.navigate(["/"]);
      } else {
        this.state = LoginState.LOGIN_ERROR;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.state = LoginState.LOGIN_ERROR;
    }
  }

  async logout() {
    await this.#authService.logout();
    this.state = LoginState.INITIAL;
  }

  addPasskey() {
    return this.register(true);
  }

  back() {
    this.state = LoginState.INITIAL;
  }
}
