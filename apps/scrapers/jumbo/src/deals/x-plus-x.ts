import { JumboDeal } from "../jumbo-deal";

interface IXPlusXDealMatcherGroups {
  freeAmount: number;
  purchaseAmount: number;
}

export class XPlusXDeal extends JumboDeal {
  matcher = /(?<purchaseAmount>\d)\+(?<freeAmount>\d) gratis/;

  getDealPrice(productPrice: number, promotionText: string): number {
    const { purchaseAmount, freeAmount } = this.getMatcherGroups(promotionText);
    return (productPrice * purchaseAmount) / (purchaseAmount + freeAmount);
  }

  getPurchaseAmount(promotionText: string): number {
    return this.getMatcherGroups(promotionText).purchaseAmount;
  }

  getMatcherGroups(promotionText: string): IXPlusXDealMatcherGroups {
    const resultGroups = this.matcher.exec(promotionText)?.groups;
    if (!resultGroups) {
      throw new Error("Could not find promotionText");
    }

    const { purchaseAmount, freeAmount } = resultGroups;
    if (!purchaseAmount || !freeAmount) {
      throw new Error("Could not find purchaseAmount");
    }

    return {
      freeAmount: Number(freeAmount),
      purchaseAmount: Number(purchaseAmount),
    };
  }
}
