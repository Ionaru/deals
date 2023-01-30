// eslint-disable-next-line import/extensions
import { ScrapeWebsiteService } from './scrape-website.service';

enum KruidvatDealImage {
    ONE_PLUS_ONE = '1003',
    TWO_FOR_TWO = '1007',
    TWO_FOR_THREE = '1010',
    TWO_FOR_FIVE = '1014',
    TWO_FOR_SEVEN = '1018',
    TWO_FOR_NINE_NINETY_FIVE = '1024',
    TWO_FOR_TEN = '1025',
    TWO_FOR_ELEVEN = '1027',
    TWO_FOR_TWELVE = '1028',
    TWO_FOR_TWENTY = '1034',
    // TWO_PLUS_ONE = '1036',
    TWO_PLUS_TWO = '1037',
    SECOND_FOR_ONE = '1038',
    SECOND_HALF_PRICE = '1039',
    THREE_FOR_TEN = '1048',
    TWENTY_FIVE_PERCENT_OFF = '1062',
    FOURTY_PERCENT_OFF = '1067',
    FIFTY_PERCENT_OFF = '1068',
    EVERYTHING_FOR_ONE = '1086',
    ALL_FOR_SEVEN_NINETY_NINE_EACH = '1104',
    ALL_FOR_NINE_EACH = '1107',
    THREE_FOR_TWO = '1167',
    FIVE_FOR_FIVE = '1176',
    FOUR_FOR_TEN = '1183',
    TWO_FOR_THIRTEEN = '1237',
    THREE_FOR_EIGHT = '1328',
    ALL_FOR_ONE_TWENTY_NINE_EACH = '1411',
    // TWO_FOR_NINETEEN_NINETY_NINE = '1196',
    // ALL_FOR_SIXTEEN_NINETY_NINE = '1431',
    // EXTRA_FIFTY_PERCENT_OFF = '1447',
}

const ignoredDeals = ['1404', '1142'];

const priceCalculation: { [key in KruidvatDealImage]: (price?: number) => number } = Object.freeze({
    [KruidvatDealImage.ONE_PLUS_ONE]: (price: number) => price / 2,
    [KruidvatDealImage.TWO_FOR_TWO]: () => 1,
    [KruidvatDealImage.TWO_FOR_THREE]: () => 3 / 2,
    [KruidvatDealImage.TWO_FOR_FIVE]: () => 5 / 2,
    [KruidvatDealImage.TWO_FOR_SEVEN]: () => 7 / 2,
    [KruidvatDealImage.TWO_FOR_THIRTEEN]: () => 13 / 2,
    [KruidvatDealImage.TWO_FOR_TWENTY]: () => 20 / 2,
    [KruidvatDealImage.THREE_FOR_TEN]: () => 10 / 3,
    [KruidvatDealImage.TWO_FOR_TEN]: () => 10 / 2,
    [KruidvatDealImage.TWO_FOR_TWELVE]: () => 12 / 2,
    [KruidvatDealImage.TWO_FOR_ELEVEN]: () => 11 / 2,
    [KruidvatDealImage.TWO_PLUS_TWO]: (price: number) => price / 2,
    [KruidvatDealImage.SECOND_FOR_ONE]: (price: number) => (price + 1) / 2,
    [KruidvatDealImage.SECOND_HALF_PRICE]: (price: number) => price * 0.75,
    [KruidvatDealImage.TWENTY_FIVE_PERCENT_OFF]: (price: number) => price - (price / 4),
    [KruidvatDealImage.FOURTY_PERCENT_OFF]: (price: number) => price - (price * 0.4),
    [KruidvatDealImage.FIFTY_PERCENT_OFF]: (price: number) => price / 2,
    [KruidvatDealImage.EVERYTHING_FOR_ONE]: () => 1,
    [KruidvatDealImage.THREE_FOR_TWO]: () => 3 / 2,
    [KruidvatDealImage.FIVE_FOR_FIVE]: () => 1,
    [KruidvatDealImage.FOUR_FOR_TEN]: () => 10 / 4,
    [KruidvatDealImage.TWO_FOR_NINE_NINETY_FIVE]: () => 9.95 / 2,
    [KruidvatDealImage.ALL_FOR_SEVEN_NINETY_NINE_EACH]: () => 7.99,
    [KruidvatDealImage.ALL_FOR_NINE_EACH]: () => 9,
    [KruidvatDealImage.THREE_FOR_EIGHT]: () => 8 / 3,
    [KruidvatDealImage.ALL_FOR_ONE_TWENTY_NINE_EACH]: () => 1.29,
});

const parseProductPrice = (priceText: string | null = ''): number => {
    const priceParts = priceText?.split('\n').map((part) => part.trim()) || [];
    return Number(priceParts.join('') || 0);
};

export class Kruidvat extends ScrapeWebsiteService {

    protected setPage(url: URL, page: number): URL {
        url.searchParams.set('page', page.toString());
        return url;
    }

    protected async getPageAmount(path: string): Promise<number> {
        const firstPageUrl = this.buildPageUrl(path, 0);
        const document = await this.getPage(firstPageUrl);
        return this.getPagerNumbers(document.querySelector('.pager__range')?.textContent);
    }

    protected modifyURL(url: URL): URL {
        url.searchParams.set('size', '100');
        url.searchParams.set('sort', 'name-asc');
        return url;
    }

    protected getPageDeals(document: Document): string[] {

        const deals: string[] = [];

        const productList = document.querySelector('div#productList');

        if (!productList) {
            return deals;
        }

        const products = Array.from(productList.querySelectorAll(':scope > *'));

        for (const product of products) {

            const productDealImage = product.querySelector('img.roundel__img');
            if (!productDealImage) {
                continue;
            }

            const deal = productDealImage.getAttribute('data-src');
            if (!deal) {
                continue;
            }
            const dealCode = this.getDealCodeFromSrc(deal);
            if (!dealCode) {
                continue;
            }

            const title = product.querySelector('a.tile__product-slide-product-name');
            if (title) {
                const text = title.textContent?.trim();
                const productPrice = product.querySelector('.pricebadge__new-price');
                const priceText = parseProductPrice(productPrice?.textContent);
                deals.push(`${dealCode}: ${text}, €${priceText} -> €${priceCalculation[dealCode](priceText).toFixed(2)}`);
            }
        }

        return deals;
    }

    private getPagerNumbers(pagerText: string): number {
        const pagerParts = pagerText?.split('\n') || [];
        const pages = pagerParts
            .map((part) => part.trim())
            .filter((part) => part.match(/^\d+$/));
        const lastPage = pages.at(-1);
        return Number(lastPage || 0);
    }

    private getDealCodeFromSrc(src: string) {
        const dealCode = src.match(/\/(\d*).png\?/);
        if (dealCode) {
            const code = Number(dealCode[1]).toString() as KruidvatDealImage;
            if (Object.values(KruidvatDealImage).includes(code)) {
                return Object.values(KruidvatDealImage).find((value) => value === code);
            } else if (!ignoredDeals.includes(code)) {
                console.error('UNKNOWN DEAL CODE', `${this.baseUrl}/${src}`);
            }
        }
    }

}
