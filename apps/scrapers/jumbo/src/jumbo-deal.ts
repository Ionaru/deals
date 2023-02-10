export abstract class JumboDeal {
    public abstract matcher: RegExp;

    public abstract getDealPrice(
        productPrice: number,
        promotionText: string,
    ): number;

    public abstract getPurchaseAmount(promotionText: string): number;
}
