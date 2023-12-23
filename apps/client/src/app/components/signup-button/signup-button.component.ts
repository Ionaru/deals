import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { combineLatest, filter, map } from "rxjs";

import { AuthService } from "../../services/auth.service";

@Component({
  imports: [MatIconModule, MatButtonModule, RouterLink, AsyncPipe],
  selector: "deals-signup-button",
  standalone: true,
  styleUrls: ["./signup-button.component.css"],
  templateUrl: "./signup-button.component.html",
})
export class SignupButtonComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  readonly #isLoggedIn$ = this.#authService.isLoggedIn$;
  readonly #isNotOnLoginRoute$ = this.#router.events.pipe(
    filter(
      (routerEvent): routerEvent is NavigationEnd =>
        routerEvent instanceof NavigationEnd,
    ),
    map((routerEvent) => routerEvent.url !== this.loginRoute),
  );

  readonly loginRoute = "/login";

  readonly showSignupButton = combineLatest([
    this.#isLoggedIn$,
    this.#isNotOnLoginRoute$,
  ]).pipe(
    map(([isLoggedIn, isNotOnLoginRoute]) => !isLoggedIn && isNotOnLoginRoute),
  );
}
