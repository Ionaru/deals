export abstract class JumboDeal {
  abstract matcher: RegExp;

  abstract getDealPrice(productPrice: number, promotionText: string): number;

  abstract getPurchaseAmount(promotionText: string): number;
}
