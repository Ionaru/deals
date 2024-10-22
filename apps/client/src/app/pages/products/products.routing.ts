import { Routes } from "@angular/router";

import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products.component";

export default [
  {
    component: ProductsComponent,
    path: "",
    title: $localize`Products`,
  },
  {
    component: ProductComponent,
    path: ":id",
    title: $localize`Product`,
  },
] as Routes;
