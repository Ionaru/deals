import { IProductDeal } from '@deals/api';
import { ScrapeWebsiteService } from '@deals/scraper-service';

interface IDealInformation {
    calculation: (price: number) => number;
    code: string;
    purchaseAmount: number;
}

enum KruidvatDealType {
    ONE_PLUS_ONE,
    TWO_FOR_TWO,
    TWO_FOR_THREE,
    TWO_FOR_FOUR,
    TWO_FOR_FIVE,
    TWO_FOR_SIX,
    TWO_FOR_SEVEN,
    TWO_FOR_EIGHT,
    TWO_FOR_NINE_NINETY_FIVE,
    TWO_FOR_NINE,
    TWO_FOR_TEN,
    TWO_FOR_ELEVEN,
    TWO_FOR_TWELVE,
    TWO_FOR_EIGHTEEN,
    TWO_FOR_TWENTY,
    // TWO_PLUS_ONE,
    TWO_PLUS_TWO,
    SECOND_FOR_ONE,
    SECOND_HALF_PRICE,
    THREE_FOR_THREE,
    THREE_FOR_NINE,
    THREE_FOR_TEN,
    TWENTY_FIVE_PERCENT_OFF,
    FOURTY_PERCENT_OFF,
    FIFTY_PERCENT_OFF,
    THREE_FOR_SEVEN,
    EVERYTHING_FOR_ONE,
    ALL_FOR_SEVEN_NINETY_NINE_EACH,
    ALL_FOR_SIX_EACH,
    ALL_FOR_NINE_EACH,
    THREE_FOR_TWO,
    FIVE_FOR_FIVE,
    FOUR_FOR_SEVEN,
    FOUR_FOR_TEN,
    TWO_FOR_THIRTEEN,
    THREE_FOR_EIGHT,
    ALL_FOR_ONE_TWENTY_NINE_EACH,
    // TWO_FOR_NINETEEN_NINETY_NINE,
    // ALL_FOR_SIXTEEN_NINETY_NINE,
    // EXTRA_FIFTY_PERCENT_OFF,
}

const kruidvatDealInformation: { [key in KruidvatDealType]: IDealInformation } =
    Object.freeze({
        [KruidvatDealType.ONE_PLUS_ONE]: {
            calculation: (price: number) => price / 2,
            code: '1003',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_TWO]: {
            calculation: () => 1,
            code: '1007',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_THREE]: {
            calculation: () => 3 / 2,
            code: '1010',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_FOUR]: {
            calculation: () => 4 / 2,
            code: '1013',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_FIVE]: {
            calculation: () => 5 / 2,
            code: '1014',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_SIX]: {
            calculation: () => 6 / 2,
            code: '1016',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_SEVEN]: {
            calculation: () => 7 / 2,
            code: '1018',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_EIGHT]: {
            calculation: () => 8 / 2,
            code: '1020',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_NINE]: {
            calculation: () => 9 / 2,
            code: '1022',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_THIRTEEN]: {
            calculation: () => 13 / 2,
            code: '1237',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_EIGHTEEN]: {
            calculation: () => 18 / 2,
            code: '1239',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_TWENTY]: {
            calculation: () => 20 / 2,
            code: '1034',
            purchaseAmount: 2,
        },
        [KruidvatDealType.THREE_FOR_THREE]: {
            calculation: () => 1,
            code: '1042',
            purchaseAmount: 3,
        },
        [KruidvatDealType.THREE_FOR_NINE]: {
            calculation: () => 9 / 3,
            code: '1047',
            purchaseAmount: 3,
        },
        [KruidvatDealType.THREE_FOR_TEN]: {
            calculation: () => 10 / 3,
            code: '1048',
            purchaseAmount: 3,
        },
        [KruidvatDealType.TWO_FOR_TEN]: {
            calculation: () => 10 / 2,
            code: '1025',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_TWELVE]: {
            calculation: () => 12 / 2,
            code: '1028',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_FOR_ELEVEN]: {
            calculation: () => 11 / 2,
            code: '1027',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWO_PLUS_TWO]: {
            calculation: (price: number) => price / 2,
            code: '1037',
            purchaseAmount: 4,
        },
        [KruidvatDealType.SECOND_FOR_ONE]: {
            calculation: (price: number) => (price + 1) / 2,
            code: '1038',
            purchaseAmount: 2,
        },
        [KruidvatDealType.SECOND_HALF_PRICE]: {
            calculation: (price: number) => price * 0.75,
            code: '1039',
            purchaseAmount: 2,
        },
        [KruidvatDealType.TWENTY_FIVE_PERCENT_OFF]: {
            calculation: (price: number) => price - price * 0.25,
            code: '1062',
            purchaseAmount: 1,
        },
        [KruidvatDealType.FOURTY_PERCENT_OFF]: {
            calculation: (price: number) => price - price * 0.4,
            code: '1067',
            purchaseAmount: 1,
        },
        [KruidvatDealType.FIFTY_PERCENT_OFF]: {
            calculation: (price: number) => price * 0.5,
            code: '1068',
            purchaseAmount: 1,
        },
        [KruidvatDealType.EVERYTHING_FOR_ONE]: {
            calculation: () => 1,
            code: '1086',
            purchaseAmount: 1,
        },
        [KruidvatDealType.THREE_FOR_TWO]: {
            calculation: () => 2 / 3,
            code: '1167',
            purchaseAmount: 3,
        },
        [KruidvatDealType.FIVE_FOR_FIVE]: {
            calculation: () => 1,
            code: '1176',
            purchaseAmount: 5,
        },
        [KruidvatDealType.FOUR_FOR_TEN]: {
            calculation: () => 10 / 4,
            code: '1183',
            purchaseAmount: 4,
        },
        [KruidvatDealType.THREE_FOR_SEVEN]: {
            calculation: () => 7 / 3,
            code: '1191',
            purchaseAmount: 3,
        },
        [KruidvatDealType.FOUR_FOR_SEVEN]: {
            calculation: () => 7 / 4,
            code: '1382',
            purchaseAmount: 4,
        },
        [KruidvatDealType.TWO_FOR_NINE_NINETY_FIVE]: {
            calculation: () => 9.95 / 2,
            code: '1024',
            purchaseAmount: 2,
        },
        [KruidvatDealType.ALL_FOR_SEVEN_NINETY_NINE_EACH]: {
            calculation: () => 7.99,
            code: '1104',
            purchaseAmount: 1,
        },
        [KruidvatDealType.ALL_FOR_SIX_EACH]: {
            calculation: () => 6,
            code: '1100',
            purchaseAmount: 1,
        },
        [KruidvatDealType.ALL_FOR_NINE_EACH]: {
            calculation: () => 9,
            code: '1107',
            purchaseAmount: 1,
        },
        [KruidvatDealType.THREE_FOR_EIGHT]: {
            calculation: () => 8 / 3,
            code: '1328',
            purchaseAmount: 3,
        },
        [KruidvatDealType.ALL_FOR_ONE_TWENTY_NINE_EACH]: {
            calculation: () => 1.29,
            code: '1411',
            purchaseAmount: 1,
        },
    });

const ignoredDeals = new Set(['1404', '1142']);

const parseProductPrice = (priceText: string | null = ''): number => {
    const priceParts = priceText?.split('\n').map((part) => part.trim()) || [];
    return Number(priceParts.join('') || 0);
};

export class Kruidvat extends ScrapeWebsiteService {
    public shopName = 'Kruidvat';

    protected baseUrl = 'https://www.kruidvat.nl';
    protected paths = [
        // `/beauty/haarverzorging/c/20013`,
        // `/verzorging/lichaamsverzorging/deodorant/c/30056`,
        `/verzorging/lichaamsverzorging/bad-en-douche-producten/c/30057`,
    ];

    protected setPage(url: URL, page: number): URL {
        url.searchParams.set('page', page.toString());
        return url;
    }

    protected getPageAmount(document: Document): number {
        const pagerText = document.querySelector('.pager__range')?.textContent;
        return pagerText ? this.getPagerNumbers(pagerText) : 0;
    }

    protected modifyURL(url: URL): URL {
        url.searchParams.set('size', '100');
        url.searchParams.set('sort', 'name-asc');
        return url;
    }

    protected getPageDeals(document: Document): IProductDeal[] {
        const deals: IProductDeal[] = [];

        const productList = document.querySelector('div#productList');

        if (!productList) {
            return deals;
        }

        const products = [...productList.querySelectorAll(':scope > *')];

        for (const product of products) {
            const productDealImage = product.querySelector('img.roundel__img');
            if (!productDealImage) {
                continue;
            }

            // eslint-disable-next-line unicorn/prefer-dom-node-dataset
            const deal = productDealImage.getAttribute('data-src');
            if (!deal) {
                continue;
            }
            const dealCode = this.getDealCodeFromSrc(deal);
            if (!dealCode) {
                continue;
            }

            const title = product.querySelector(
                'a.tile__product-slide-product-name',
            );
            if (title) {
                let text = title.textContent?.trim();
                const description = product
                    .querySelector('.tile__product-slide-product-description')
                    ?.textContent?.trim();
                if (description) {
                    text = `${text} - ${description}`;
                }
                const productPrice = product.querySelector(
                    '.pricebadge__new-price',
                );
                const priceText = parseProductPrice(productPrice?.textContent);
                const productImage = product
                    .querySelector('img.tile__product-slide-image')
                    ?.getAttribute('data-src');

                deals.push({
                    dealPrice:
                        kruidvatDealInformation[dealCode].calculation(
                            priceText,
                        ),
                    imageUrl: this.baseUrl + productImage || '',
                    name: text || 'Unknown product',
                    price: priceText,
                    productUrl: `${this.baseUrl}${title.getAttribute('href')}`,
                    purchaseAmount:
                        kruidvatDealInformation[dealCode].purchaseAmount,
                });
            }
        }

        return deals;
    }

    private getPagerNumbers(pagerText: string): number {
        const pagerParts = pagerText.split('\n') || [];
        const pages = pagerParts
            .map((part) => part.trim())
            .filter((part) => part.match(/^\d+$/));
        const lastPage = pages.at(-1);
        return Number(lastPage || 0);
    }

    private getDealCodeFromSrc(source: string): KruidvatDealType | void {
        const dealCode = source.match(/\/(\d*).png\?/);
        if (dealCode) {
            const code = Number(dealCode[1]).toString();
            const dealType = Object.entries(kruidvatDealInformation).find(
                (value) => value[1].code === code,
            );

            if (dealType) {
                return dealType[0] as unknown as KruidvatDealType;
            } else if (!ignoredDeals.has(code)) {
                // eslint-disable-next-line no-console
                console.error('UNKNOWN DEAL CODE', `${this.baseUrl}${source}`);
            }
        }
    }
}
