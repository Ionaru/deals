export interface IProductDeal {
    name: string;
    imageUrl: string;
    price: number;
    productUrl: string;
    dealPrice: number;
    purchaseAmount: number;
}

export enum ScraperStatus {
    IDLE = 'IDLE',
    SCRAPING = 'SCRAPING',
    ERROR = 'ERROR',
}

export const service = Object.freeze({
    STORAGE: Symbol('STORAGE'),
});

export enum MSMessage {
    DEAL_FOUND,
}

export interface IMSPayload {
    [MSMessage.DEAL_FOUND]: {
        deals: IProductDeal[];
        shop: string;
    };
}
