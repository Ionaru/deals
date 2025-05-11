import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { lastValueFrom, map } from "rxjs";

import { AuthService } from "../../services/auth.service.js";
import { WebauthnService } from "../../services/webauthn.service.js";

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
  ],
  styleUrl: "./login.component.css",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  state = signal(LoginState.INITIAL);
  states = LoginState;

  createdName = signal<string | null>(null);

  form = new FormGroup({
    displayName: new FormControl(""),
  });

  readonly #authService = inject(AuthService);
  readonly #webauthnService = inject(WebauthnService);
  readonly #router = inject(Router);

  readonly isLoggedIn = toSignal(this.#authService.user$.pipe(map(Boolean)));
  readonly user = toSignal(this.#authService.user$);

  startRegister() {
    this.state.set(LoginState.REGISTER);
  }

  async register() {
    this.state.set(LoginState.REGISTERING);
    try {
      const username = await this.#webauthnService.register(
        this.form.value.displayName ?? undefined,
      );
      this.state.set(LoginState.REGISTERED);
      this.createdName.set(username);
    } catch (error) {
      console.error(error);
      this.state.set(LoginState.LOGIN_ERROR);
    }
  }

  async startLogin() {
    this.state.set(LoginState.LOGIN);

    try {
      await this.#webauthnService.login();
      void this.#router.navigate(["/"]);
    } catch (error) {
      console.error(error);
      this.state.set(LoginState.LOGIN_ERROR);
    }
  }

  async logout() {
    console.log("logout");
    await lastValueFrom(this.#authService.logout$);
    this.state.set(LoginState.INITIAL);
  }

  async addPasskey() {
    this.state.set(LoginState.REGISTERING);
    try {
      await this.#webauthnService.addPasskey(
        this.form.value.displayName ?? undefined,
      );
      this.state.set(LoginState.REGISTERED);
    } catch (error) {
      console.error(error);
      this.state.set(LoginState.LOGIN_ERROR);
    }
  }

  back() {
    this.state.set(LoginState.INITIAL);
  }
}
