import { randomUUID } from 'node:crypto';

import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export type BaseModelProperties = Pick<
    BaseModel,
    'id' | 'createdOn' | 'updatedOn' | 'deletedOn'
>;

export abstract class BaseModel extends BaseEntity {
    public static readonly alias: string;

    @PrimaryGeneratedColumn('uuid')
    public readonly id!: string;

    @CreateDateColumn()
    public readonly createdOn!: Date;

    @UpdateDateColumn()
    public readonly updatedOn!: Date;

    @DeleteDateColumn({ name: 'deletedOn', select: false })
    public readonly deletedOn?: Date;

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    public constructor() {
        super();
        this.id = randomUUID();
    }
}
