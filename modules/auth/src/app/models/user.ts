import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";

import { Role } from "../jwt.type.js";

import { Credential } from "./credential.js";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ type: "string" })
  username!: string;

  @Column({ type: "string", array: true })
  roles!: Role[];

  @Column(() => Credential, { array: true })
  credentials!: Credential[];

  @CreateDateColumn()
  createdAt!: string;
}
