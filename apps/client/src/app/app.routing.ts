import { Routes } from "@angular/router";

import { isAdminGuard } from "./guards/is-admin.guard.js";

export default [
  {
    loadChildren: () => import("./pages/home/home.routing.js"),
    path: "",
  },
  {
    loadChildren: () => import("./pages/products/products.routing.js"),
    path: "products",
  },
  {
    loadChildren: () => import("./pages/admin/admin.routing.js"),
    path: "admin",
    canActivate: [isAdminGuard],
  },
  {
    loadChildren: () => import("./pages/settings/settings.routing.js"),
    path: "settings",
  },
  {
    loadChildren: () => import("./pages/login/login.routing.js"),
    path: "login",
  },
  {
    loadChildren: () =>
      import("./pages/notifications/notifications.routing.js"),
    path: "notifications",
  },
] as Routes;
