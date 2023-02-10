import { JumboDeal } from '../jumbo-deal';

interface IXPercentOffMatcherGroups {
    percentage: number;
}

export class XPercentOff extends JumboDeal {
    public matcher = /(?<percentage>\d\d?)% korting/;

    public getDealPrice(productPrice: number, promotionText: string): number {
        const { percentage } = this.getMatcherGroups(promotionText);
        return productPrice * (percentage / 100);
    }

    public getPurchaseAmount(_promotionText: string): number {
        return 1;
    }

    private getMatcherGroups(promotionText: string): IXPercentOffMatcherGroups {
        const resultGroups = this.matcher.exec(promotionText)?.groups;
        if (!resultGroups) {
            throw new Error('Could not find promotionText');
        }

        const { percentage } = resultGroups;
        if (!percentage) {
            throw new Error('Could not find percentage');
        }

        return {
            percentage: Number(percentage),
        };
    }
}
