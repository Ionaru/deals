import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base.model';
import { Product } from './product';

@Entity()
export class Shop extends BaseModel {
    @Column({
        type: 'varchar',
        unique: true,
    })
    public name!: string;

    @OneToMany(() => Product, (product) => product.shop, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    public products!: Product[];
}
