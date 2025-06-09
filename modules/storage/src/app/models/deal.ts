import { Column, Entity, ManyToOne } from "typeorm";

import { BaseModel } from "./base.model.js";
import { Product } from "./product.js";

@Entity()
export class Deal extends BaseModel {
  @Column({
    type: "double",
  })
  dealPrice!: number;

  @Column({
    type: "integer",
  })
  dealQuantity!: number;

  @Column({
    type: "boolean",
    default: false,
  })
  requiresCard!: boolean;

  @ManyToOne(() => Product, (product) => product.deals, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product!: Product;
}
