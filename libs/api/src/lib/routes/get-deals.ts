export type IDealsRequest = Record<string, never>;

export interface IDealsResponse {
    deals: IDeal[];
}

export interface IDeal {
    id: string;
    price: number;

    product: IProduct;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}
