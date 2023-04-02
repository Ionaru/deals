import { IProduct } from './product';

export interface IDeal {
    id: string;
    dealPrice: number;
    dealQuantity: number;
    product: IProduct;
}
