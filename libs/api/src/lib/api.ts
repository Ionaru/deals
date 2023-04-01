export interface IProductDeal {
    name: string;
    imageUrl: string;
    price: number;
    productUrl: string;
    dealPrice: number;
    purchaseAmount: number;
}

export interface IUnknownDeal {
    promotionText: string;
    productUrl: string;
}

export enum ScraperStatus {
    IDLE = 'IDLE',
    SCRAPING = 'SCRAPING',
    ERROR = 'ERROR',
}

export const network = Object.freeze({
    PRIMARY: Symbol('PRIMARY'),
    SCRAPER: Symbol('SCRAPER'),
});

export enum MSMessage {
    DEAL_FOUND = 'DEAL_FOUND',
    UNKNOWN_DEAL = 'UNKNOWN_DEAL',
    GET_DEALS = 'GET_DEALS',
    GET_HEALTH = 'GET_HEALTH',
    REGISTER_SERVICE = 'REGISTER_SERVICE',
    UNREGISTER_SERVICE = 'UNREGISTER_SERVICE',
    REPORT_SERVICE = 'REPORT_SERVICE',
    GET_SERVICES = 'GET_SERVICES',
}

export interface IMSPayload {
    [MSMessage.DEAL_FOUND]: {
        deals: IProductDeal[];
        shop: string;
    };

    [MSMessage.UNKNOWN_DEAL]: {
        deal: IUnknownDeal;
        shop: string;
    };

    [MSMessage.GET_DEALS]: {
        deals: IProductDeal[];
    };

    [MSMessage.GET_HEALTH]: {
        status: 'ok';
    };

    [MSMessage.REGISTER_SERVICE]: {
        name: string;
        queue: string;
        isScraper?: boolean;
    };

    [MSMessage.UNREGISTER_SERVICE]: {
        queue: string;
    };
}
