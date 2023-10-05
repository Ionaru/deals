import { Routes } from "@angular/router";

export default [
  {
    loadChildren: () => import("./pages/home/home.routing"),
    path: "",
  },
  {
    loadChildren: () => import("./pages/admin/admin.routing"),
    path: "admin",
  },
  {
    loadChildren: () => import("./pages/settings/settings.routing"),
    path: "settings",
  },
  {
    loadChildren: () => import("./pages/login/login.routing"),
    path: "login",
  },
  {
    loadChildren: () => import("./pages/notifications/notifications.routing"),
    path: "notifications",
  },
] as Routes;
