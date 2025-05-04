import { Column, Entity, ManyToOne, Relation } from "typeorm";

import { BaseModel } from "./base.model.js";
import { Product } from "./product.js";

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
  product!: Relation<Product>;
}
