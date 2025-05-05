import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";

import { Credential } from "./auth.model.js";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ type: "string" })
  username!: string;

  @Column({ type: "boolean" })
  isAdmin!: boolean;

  @Column(() => Credential, { array: true })
  credentials!: Credential[];

  @CreateDateColumn()
  createdAt!: string;
}
