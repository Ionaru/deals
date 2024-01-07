import { JumboDeal } from "../jumbo-deal";

interface IXPriceOffMatcherGroups {
  amount: number;
}

export class XPriceOff extends JumboDeal {
  matcher = /€ ?(?<amount>\d\d?,\d\d) korting/;

  getDealPrice(productPrice: number, promotionText: string): number {
    const { amount } = this.getMatcherGroups(promotionText);
    return productPrice - amount;
  }

  getPurchaseAmount(_promotionText: string): number {
    return 1;
  }

  getMatcherGroups(promotionText: string): IXPriceOffMatcherGroups {
    const resultGroups = this.matcher.exec(promotionText)?.groups;
    if (!resultGroups) {
      throw new Error("Could not find promotionText");
    }

    const { amount } = resultGroups;
    if (!amount) {
      throw new Error(`Could not find amount in ${promotionText}`);
    }

    return {
      amount: Number(amount.replace(",", ".")),
    };
  }
}
