import { Column, Entity, ManyToOne } from "typeorm";

import { BaseModel } from "./base.model";
import { Product } from "./product";

@Entity()
export class PriceHistory extends BaseModel {
  @Column({
    type: "double",
  })
  price!: number;

  @ManyToOne(() => Product, (product) => product.deals, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product!: Product;
}
