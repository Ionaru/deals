import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.model';
import { Shop } from './shop';

@Entity()
export class UnknownDeal extends BaseModel {
    @Column({
        type: 'text',
    })
    public deal!: string;

    @Column({
        type: 'text',
    })
    public productUrl!: string;

    @ManyToOne(() => Shop, (shop) => shop.products, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public shop!: Shop;
}
