import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

export interface IProductDeal {
    name: string;
    imageUrl: string;
    price: number;
    productUrl: string;
    dealPrice: number;
    purchaseAmount: number;
}

@Injectable()
export abstract class ScrapeWebsiteService {

    protected abstract baseUrl: string;
    protected abstract paths: string[];

    public async scrape() {
        const deals: IProductDeal[] = [];

        for (const path of this.paths) {
            const pathDeals = await this.scrapePath(path);
            deals.push(...pathDeals);
        }

        for (const deal of deals) {
            console.log(deal);
        }
    }

    public async scrapePath(path: string): Promise<IProductDeal[]> {

        const deals = [];
        const pages = await this.getPageAmount(path);
        console.log(`Path ${path} has ${pages} pages.`);
        const url = this.buildUrl(path);

        for (let page = 0; page < pages; page++) {
            const pageUrl = this.setPage(url, page);
            const pageDeals = await this.scrapePage(pageUrl);
            deals.push(...pageDeals);
        }

        return deals;
    }

    protected async getPage(url: URL): Promise<Document> {
        const modifiedUrl = this.modifyURL(url);
        console.log(`Fetching: ${modifiedUrl}`);
        const result = await fetch(modifiedUrl);
        const html = await result.text();
        return new JSDOM(html).window.document;
    }

    protected buildPageUrl(path: string, page: number): URL {
        return this.setPage(this.buildUrl(path), page);
    }

    private async scrapePage(url: URL): Promise<IProductDeal[]> {
        const pageDocument = await this.getPage(url);
        return this.getPageDeals(pageDocument);
    }

    private buildUrl(path: string): URL {
        return new URL(path, this.baseUrl);
    }

    protected abstract setPage(url: URL, page: number): URL;
    protected abstract getPageAmount(path: string): Promise<number>;

    protected abstract getPageDeals(page: Document): IProductDeal[];

    protected abstract modifyURL(url: URL): URL;

}
