import { JumboDeal } from "../jumbo-deal";

interface IXForXPriceDealMatcherGroups {
  amount: number;
  price: number;
}

export class XForXPrice extends JumboDeal {
  matcher = /(?<amount>\d) voor (?:€ ?)?(?<price>\d\d?[,.]\d\d)(?: euro)?/;

  getDealPrice(_productPrice: number, promotionText: string): number {
    const { amount, price } = this.getMatcherGroups(promotionText);
    return price / amount;
  }

  getPurchaseAmount(promotionText: string): number {
    return this.getMatcherGroups(promotionText).amount;
  }

  getMatcherGroups(promotionText: string): IXForXPriceDealMatcherGroups {
    const resultGroups = this.matcher.exec(promotionText)?.groups;
    if (!resultGroups) {
      throw new Error("Could not find promotionText");
    }

    const { amount, price } = resultGroups;
    if (!amount || !price) {
      throw new Error("Could not find purchase amount");
    }

    return {
      amount: Number(amount),
      price: Number(price.replace(",", ".")),
    };
  }
}
