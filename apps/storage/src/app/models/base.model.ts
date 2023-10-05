import { randomUUID } from "node:crypto";

import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type BaseModelProperties = Pick<
  BaseModel,
  "id" | "createdOn" | "updatedOn" | "deletedOn"
>;

export abstract class BaseModel extends BaseEntity {
  static readonly alias: string;

  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @CreateDateColumn()
  readonly createdOn!: Date;

  @UpdateDateColumn()
  readonly updatedOn!: Date;

  @DeleteDateColumn({ name: "deletedOn", select: false })
  readonly deletedOn?: Date;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor() {
    super();
    this.id = randomUUID();
  }
}
