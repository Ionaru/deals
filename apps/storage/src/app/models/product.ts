import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base.model';
import { Deal } from './deal';
import { Shop } from './shop';

@Entity()
export class Product extends BaseModel {
    @Column({
        type: 'varchar',
        unique: true,
    })
    public name!: string;

    @Column({
        type: 'text',
    })
    public imageUrl!: string;

    @Column({
        type: 'double',
    })
    public price!: number;

    @Column({
        type: 'text',
    })
    public productUrl!: string;

    @OneToMany(() => Deal, (deal) => deal.product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public deals!: Deal[];

    @ManyToOne(() => Shop, (shop) => shop.products, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public shop!: Shop;
}
