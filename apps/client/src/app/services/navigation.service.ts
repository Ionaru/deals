import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { AuthService } from "./auth.service.js";

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
    { name: $localize`Deals`, path: "/" },
    { name: $localize`Products`, path: "/products" },
    { name: "FAQ", path: "/faq" },
    { adminOnly: true, name: "Admin", path: "/admin" },
  ];

  #isAdmin$$ = toSignal(this.#authService.isAdmin$);

  readonly routes$$ = computed(() =>
    this.#routes.filter((route) => !route.adminOnly || this.#isAdmin$$()),
  );
}
