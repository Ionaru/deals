import { IProductDeal } from '@deals/api';
import { Injectable, Logger } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export abstract class ScrapeWebsiteService {
    private readonly logger = new Logger(ScrapeWebsiteService.name);

    public abstract shopName: string;

    protected abstract baseUrl: string;
    protected abstract paths: string[];

    public async scrape() {
        const deals: IProductDeal[] = [];

        for (const path of this.paths) {
            const pathDeals = await this.scrapePath(path);
            deals.push(...pathDeals);
        }

        this.logger.log(`Found ${deals.length} deals.`);

        return deals;
    }

    public async scrapePath(path: string): Promise<IProductDeal[]> {
        const deals = [];
        const firstPageUrl = this.buildPageUrl(path, 0);
        const document = await this.getPage(firstPageUrl);
        const pages = this.getPageAmount(document);
        this.logger.log(`Path ${path} has ${pages} pages.`);
        const url = this.buildUrl(path);

        for (let page = 0; page < pages; page++) {
            const pageUrl = this.setPage(url, page);
            const pageDeals = await this.scrapePage(
                pageUrl,
                page === 0 ? document : undefined,
            );
            deals.push(...pageDeals);
        }

        return deals;
    }

    protected async getPage(url: URL): Promise<Document> {
        const modifiedUrl = this.modifyURL(url);
        this.logger.log(`Fetching: ${modifiedUrl}`);
        const result = await fetch(modifiedUrl);
        const html = await result.text();
        return new JSDOM(html).window.document;
    }

    protected buildPageUrl(path: string, page: number): URL {
        return this.setPage(this.buildUrl(path), page);
    }

    private async scrapePage(
        url: URL,
        fetchedDocument?: Document,
    ): Promise<IProductDeal[]> {
        if (!fetchedDocument) {
            const pageDocument = await this.getPage(url);
            return this.getPageDeals(pageDocument);
        }
        return this.getPageDeals(fetchedDocument);
    }

    private buildUrl(path: string): URL {
        return new URL(path, this.baseUrl);
    }

    protected abstract setPage(url: URL, page: number): URL;
    protected abstract getPageAmount(page: Document): number;

    protected abstract getPageDeals(page: Document): IProductDeal[];

    protected abstract modifyURL(url: URL): URL;
}
