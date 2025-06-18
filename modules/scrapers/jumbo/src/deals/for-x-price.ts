import { JumboDeal } from "../jumbo-deal.js";

interface IForXPriceDealMatcherGroups {
  price: number;
}

export class ForXPrice extends JumboDeal {
  matcher = /voor (?:€ ?)?(?<price>\d\d?[,.]\d\d)(?: euro)?/;

  getDealPrice(_productPrice: number, promotionText: string): number {
    const { price } = this.getMatcherGroups(promotionText);
    return price;
  }

  getPurchaseAmount(_promotionText: string): number {
    return 1;
  }

  getMatcherGroups(promotionText: string): IForXPriceDealMatcherGroups {
    const resultGroups = this.matcher.exec(promotionText)?.groups;
    if (!resultGroups) {
      throw new Error("Could not find promotionText");
    }

    const { price } = resultGroups;
    if (!price) {
      throw new Error("Could not find price");
    }

    return {
      price: Number(price.replace(",", ".")),
    };
  }
}
