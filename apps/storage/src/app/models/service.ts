import { ServiceType } from '@deals/api';
import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.model';

@Entity()
export class Service extends BaseModel {
    @Column({
        type: 'varchar',
    })
    public name!: string;

    @Column({
        type: 'varchar',
        unique: true,
    })
    public queue!: string;

    @Column({
        type: 'varchar',
        unique: false,
    })
    public type!: ServiceType;
}
