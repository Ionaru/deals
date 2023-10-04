import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.model';
import { Product } from './product';

@Entity()
export class Deal extends BaseModel {
    @Column({
        type: 'double',
    })
    dealPrice!: number;

    @Column({
        type: 'integer',
    })
    dealQuantity!: number;

    @ManyToOne(() => Product, (product) => product.deals, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    product!: Product;
}
