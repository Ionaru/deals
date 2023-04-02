import { IShop } from './shop';

export interface IProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    productUrl: string;
    shop: IShop;
}
