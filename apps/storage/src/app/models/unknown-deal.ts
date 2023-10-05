import { Column, Entity, ManyToOne } from "typeorm";

import { BaseModel } from "./base.model";
import { Shop } from "./shop";

@Entity()
export class UnknownDeal extends BaseModel {
  @Column({
    type: "text",
  })
  deal!: string;

  @Column({
    type: "text",
  })
  productUrl!: string;

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  shop!: Shop;
}
