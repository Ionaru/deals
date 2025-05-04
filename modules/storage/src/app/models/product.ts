import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseModel } from "./base.model.js";
import { DealHistory } from "./deal-history.js";
import { Deal } from "./deal.js";
import { PriceHistory } from "./price-history.js";
import { Shop } from "./shop.js";

@Entity()
export class Product extends BaseModel {
  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({
    type: "text",
  })
  imageUrl!: string;

  @Column({
    type: "double",
  })
  price!: number;

  @Column({
    type: "text",
  })
  productUrl!: string;

  @OneToMany(() => Deal, (deal) => deal.product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  deals!: Deal[];

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  shop!: Shop;

  @OneToMany(() => PriceHistory, (history) => history.product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  priceHistory!: PriceHistory[];

  @OneToMany(() => DealHistory, (history) => history.product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  dealHistory!: DealHistory[];
}
