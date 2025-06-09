import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";

import { AuthService } from "../services/auth.service.js";

export const isAdminGuard: CanActivateFn = () => {
  return inject(AuthService).isAdmin$.pipe(map((isAdmin) => isAdmin ?? false));
};
