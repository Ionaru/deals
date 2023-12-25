import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { AuthService } from "./auth.service";

interface Route {
  path: string;
  name: string;
  adminOnly?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  readonly #authService = inject(AuthService);

  readonly #routes: Route[] = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
    { adminOnly: true, name: "Admin", path: "/admin" },
  ];

  #isAdmin$$ = toSignal(this.#authService.isAdmin$);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  readonly routes$$ = computed(() =>
    this.#routes.filter((r) => !r.adminOnly || this.#isAdmin$$()),
  );
}
