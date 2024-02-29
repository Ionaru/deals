import { Routes } from "@angular/router";

import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products.component";

export default [
  {
    component: ProductsComponent,
    path: "",
  },
  {
    component: ProductComponent,
    path: ":id",
  },
] as Routes;
