import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.model';
import { Product } from './product';

@Entity()
export class Deal extends BaseModel {
    @Column({
        type: 'double',
    })
    public dealPrice!: number;

    @Column({
        type: 'integer',
    })
    public dealQuantity!: number;

    @ManyToOne(() => Product, (product) => product.deals, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public product!: Product;
}
