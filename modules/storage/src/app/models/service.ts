import { ServiceType } from "@deals/api";
import { Column, Entity } from "typeorm";

import { BaseModel } from "./base.model.js";

@Entity()
export class Service extends BaseModel {
  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  queue!: string;

  @Column({
    type: "varchar",
    unique: false,
  })
  type!: ServiceType;
}
