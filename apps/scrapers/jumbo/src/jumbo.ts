import { IProductDeal, ScrapeWebsiteService } from '@deals/scraper-service';

enum JumboDealType {
    SECOND_HALF_PRICE,
    X_FOR_X_PRICE,
    X_PERCENT_OFF,
    X_PLUS_X,
}

const jumboDealMatchers: { [key in JumboDealType]: RegExp } = Object.freeze({
    [JumboDealType.X_PLUS_X]: /(?<purchaseAmount>\d)\+(?<freeAmount>\d) gratis/,
    [JumboDealType.SECOND_HALF_PRICE]: /2e halve prijs/,
    [JumboDealType.X_PERCENT_OFF]: /(?<percentage>\d\d?)% korting/,
    [JumboDealType.X_FOR_X_PRICE]: /(?<amount>\d) voor € (?<price>\d\d?,\d\d)/,
});

const jumboDealPriceCalculations = Object.freeze({
    [JumboDealType.X_PLUS_X]: (price: number, purchaseAmount: number, freeAmount: number) =>
        (price * purchaseAmount) / (purchaseAmount + freeAmount),
    [JumboDealType.SECOND_HALF_PRICE]: (price: number) => price + (price / 2),
    [JumboDealType.X_PERCENT_OFF]: (price: number, percentage: number) => price * (percentage / 100),
    [JumboDealType.X_FOR_X_PRICE]: (price: number, amount: number) => price / amount,
});

export class Jumbo extends ScrapeWebsiteService {

    protected override baseUrl = 'https://www.jumbo.com';
    protected override paths = ['/producten/alle-aanbiedingen'];

    protected override async getPageAmount(path: string) {
        const firstPageUrl = this.buildPageUrl(path, 0);
        const document = await this.getPage(firstPageUrl);
        const pager = document.querySelector('.pages-grid');
        const pagerText = pager?.textContent?.trim();
        return Number(pagerText?.split(' ').at(-1)) || 0;
    }

    protected override getPageDeals(page: Document) {
        const products = page.querySelectorAll('div.card-product');

        const deals: IProductDeal[] = [];

        for (const product of products) {
            const promotion = product.querySelector('.promotions');
            if (!promotion) {
                continue;
            }

            const promotionText = promotion.querySelector('.jum-tag.prominent')?.textContent?.trim();
            if (!promotionText) {
                continue;
            }

            const promoPriceText = product.querySelector('.promo-price')?.textContent?.trim().replace(',', '.');
            const currentPriceText = product.querySelector('.current-price')?.textContent?.trim().replace(' ', '.');
            const productPrice = promoPriceText ? Number(promoPriceText) : Number(currentPriceText);

            const productName = product.querySelector('.name .title')?.textContent?.trim();

            const dealPrice = this.getDealPrice(Number(productPrice), promotionText);
            const purchaseAmount = this.getPurchaseAmount(promotionText);

            deals.push({
                dealPrice,
                imageUrl: product.querySelector('.product-image img')?.getAttribute('src') || '',
                name: productName || 'Unknown product',
                price: productPrice,
                productUrl: `${this.baseUrl}${product.querySelector('a')?.getAttribute('href')}`,
                purchaseAmount,
            });
        }

        return deals;
    }

    protected override modifyURL(url: URL) {
        return url;
    }

    protected override setPage(url: URL, page: number) {
        url.searchParams.set('offSet', (page * 24).toString());
        return url;
    }

    private parseDealText(text: string): JumboDealType | void {

        for (const [type, regex] of Object.entries(jumboDealMatchers)) {
            if (regex.test(text)) {
                return Number(type) as unknown as JumboDealType;
            }
        }
    }

    private getDealPrice(productPrice: number, promotionText: string): number {
        const dealType = this.parseDealText(promotionText);

        switch (dealType) {
            case JumboDealType.X_PLUS_X: {
                const resultGroups = jumboDealMatchers[dealType].exec(promotionText)?.groups;
                if (!resultGroups) {
                    break;
                }

                const { purchaseAmount, freeAmount } = resultGroups;
                if (!purchaseAmount || !freeAmount) {
                    break;
                }

                return jumboDealPriceCalculations[dealType](productPrice, Number(purchaseAmount), Number(freeAmount));
            }

            case JumboDealType.X_FOR_X_PRICE: {
                const resultGroups = jumboDealMatchers[dealType].exec(promotionText)?.groups;
                if (!resultGroups) {
                    break;
                }

                const { amount, price } = resultGroups;
                if (!amount || !price) {
                    break;
                }

                return jumboDealPriceCalculations[dealType](Number(price.replace(',', '.')), Number(amount));
            }

            case JumboDealType.SECOND_HALF_PRICE: {
                return jumboDealPriceCalculations[dealType](productPrice);
            }

            case JumboDealType.X_PERCENT_OFF: {
                const resultGroups = jumboDealMatchers[dealType].exec(promotionText)?.groups;
                if (!resultGroups) {
                    break;
                }

                const { percentage } = resultGroups;
                if (!percentage) {
                    break;
                }

                return jumboDealPriceCalculations[dealType](productPrice, Number(percentage));
            }
        }

        console.error('NOT IMPLEMENTED', dealType);
        return productPrice;
    }

    private getPurchaseAmount(promotionText: string): number {
        const dealType = this.parseDealText(promotionText);

        switch (dealType) {
            case JumboDealType.X_PLUS_X: {
                const resultGroups = jumboDealMatchers[dealType].exec(promotionText)?.groups;
                if (!resultGroups) {
                    break;
                }

                const { purchaseAmount } = resultGroups;
                if (!purchaseAmount) {
                    break;
                }

                return Number(purchaseAmount);
            }

            case JumboDealType.X_FOR_X_PRICE: {
                const resultGroups = jumboDealMatchers[dealType].exec(promotionText)?.groups;
                if (!resultGroups) {
                    break;
                }

                const { amount } = resultGroups;
                if (!amount) {
                    break;
                }

                return Number(amount);
            }

            case JumboDealType.SECOND_HALF_PRICE: {
                return 2;
            }

            case JumboDealType.X_PERCENT_OFF: {
                return 1;
            }
        }

        return 1;
    }

}
