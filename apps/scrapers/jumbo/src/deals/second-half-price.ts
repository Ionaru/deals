import { JumboDeal } from '../jumbo-deal';

export class SecondHalfPrice extends JumboDeal {
    public matcher = /2e halve prijs/;

    public getDealPrice(productPrice: number): number {
        return productPrice + productPrice / 2;
    }

    public getPurchaseAmount(_promotionText: string): number {
        return 2;
    }
}
