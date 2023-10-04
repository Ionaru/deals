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
    name!: string;

    @Column({
        type: 'text',
    })
    imageUrl!: string;

    @Column({
        type: 'double',
    })
    price!: number;

    @Column({
        type: 'text',
    })
    productUrl!: string;

    @OneToMany(() => Deal, (deal) => deal.product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    deals!: Deal[];

    @ManyToOne(() => Shop, (shop) => shop.products, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    shop!: Shop;
}
