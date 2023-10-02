/* eslint-disable sort-keys,no-console */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';

enum LoginState {
    INITIAL,
    LOGIN,
    LOGIN_ERROR,
    REGISTER,
    REGISTER_ERROR,
    REGISTERING,
}

@Component({
    selector: 'deals-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    state = LoginState.INITIAL;
    states = LoginState;

    form: FormGroup = new FormGroup({
        displayName: new FormControl(''),
    });

    readonly #authService = inject(AuthService);

    async startRegister() {
        console.log('start register');
        this.state = LoginState.REGISTER;
    }

    async register() {
        this.state = LoginState.REGISTERING;
        try {
            const credential = this.#authService.register(
                this.form.get('displayName')?.value,
            );
            if (credential) {
                this.state = LoginState.INITIAL;
            }
        } catch {
            this.state = LoginState.REGISTER_ERROR;
        }
    }

    async startLogin() {
        this.state = LoginState.LOGIN;
        console.log('start login');

        try {
            const assertion = await this.#authService.login();
            if (assertion) {
                this.state = LoginState.INITIAL;
            }
        } catch {
            this.state = LoginState.LOGIN_ERROR;
        }
    }

    back() {
        this.state = LoginState.INITIAL;
    }
}
// fpllyLvxZ3syPiFQ7CKy7w
