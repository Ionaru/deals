// eslint-disable-next-line import/extensions
import { ScrapeWebsiteService } from './scrape-website.service';

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
    [JumboDealType.X_PLUS_X]: (price: number, purchaseAmount: number, freeAmount: number) => (price * purchaseAmount) / (purchaseAmount + freeAmount),
    [JumboDealType.SECOND_HALF_PRICE]: (price: number) => price + (price / 2),
    [JumboDealType.X_PERCENT_OFF]: (price: number, percentage: number) => price * (percentage / 100),
    [JumboDealType.X_FOR_X_PRICE]: (price: number, amount: number) => price / amount,
});

export class Jumbo extends ScrapeWebsiteService {

    protected async getPageAmount(path: string): Promise<number> {
        const firstPageUrl = this.buildPageUrl(path, 0);
        const document = await this.getPage(firstPageUrl);
        const pager = document.querySelector('.pages-grid');
        const pagerText = pager.textContent.trim();
        return Number(pagerText.split(' ').at(-1)) || 0;
    }

    protected getPageDeals(page: Document): string[] {
        const products = page.querySelectorAll('div.card-product');

        for (const product of products) {
            const promotion = product.querySelector('.promotions');
            if (!promotion) {
                continue;
            }

            const promotionText = promotion.querySelector('.jum-tag.prominent')?.textContent.trim();
            if (!promotionText) {
                continue;
            }

            const productName = product.querySelector('.name .title')?.textContent.trim();
            const productPrice = product.querySelector('.current-price')?.textContent.trim().replace(' ', '.');
            // console.log(productName);

            const dealPrice = this.getDealPrice(Number(productPrice), promotionText);
            console.log(`${productName}: ${productPrice} -> ${dealPrice}`);
        }

        return [];
    }

    protected modifyURL(url: URL): URL {
        return url;
    }

    protected setPage(url: URL, page: number): URL {
        url.searchParams.set('offSet', (page * 24).toString());
        return url;
    }

    private parseDealText(text: string): JumboDealType | undefined {

        for (const [type, regex] of Object.entries(jumboDealMatchers)) {
            if (regex.exec(text)) {
                return Number(type) as unknown as JumboDealType;
            }
        }

        console.log('UNKNOWN DEAL:', text);
    }

    private getDealPrice(productPrice: number, promotionText: string): number {
        const dealType = this.parseDealText(promotionText);

        switch (dealType) {
            case JumboDealType.X_PLUS_X: {
                const {
                    purchaseAmount,
                    freeAmount,
                } = jumboDealMatchers[dealType].exec(promotionText).groups;
                return jumboDealPriceCalculations[dealType](productPrice, Number(purchaseAmount), Number(freeAmount));
            }

            case JumboDealType.X_FOR_X_PRICE: {
                const {
                    amount,
                    price,
                } = jumboDealMatchers[dealType].exec(promotionText).groups;
                return jumboDealPriceCalculations[dealType](Number(price.replace(',', '.')), Number(amount));
            }

            case JumboDealType.SECOND_HALF_PRICE: {
                return jumboDealPriceCalculations[dealType](productPrice);
            }

            case JumboDealType.X_PERCENT_OFF: {
                const { percentage } = jumboDealMatchers[dealType].exec(promotionText).groups;
                return jumboDealPriceCalculations[dealType](productPrice, Number(percentage));
            }
        }

        console.error('NOT IMPLEMENTED', dealType);
    }

}
