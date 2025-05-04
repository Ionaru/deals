import { JumboDeal } from "../jumbo-deal.js";

export class SecondHalfPrice extends JumboDeal {
  matcher = /2e halve prijs/;

  getDealPrice(productPrice: number): number {
    return (productPrice + productPrice / 2) / 2;
  }

  getPurchaseAmount(_promotionText: string): number {
    return 2;
  }
}
