export enum DiscountCode {
  DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT",
  DISCOUNT_FALLBACK = "DISCOUNT_FALLBACK",
  DISCOUNT_FIXED_PRICE = "DISCOUNT_FIXED_PRICE",
  DISCOUNT_PERCENTAGE = "DISCOUNT_PERCENTAGE",
  DISCOUNT_X_FOR_Y = "DISCOUNT_X_FOR_Y",
  DISCOUNT_X_PLUS_Y_FREE = "DISCOUNT_X_PLUS_Y_FREE",
  DISCOUNT_WEIGHT = "DISCOUNT_WEIGHT",
  DISCOUNT_ONE_HALF_PRICE = "DISCOUNT_ONE_HALF_PRICE",
  DISCOUNT_BONUS = "DISCOUNT_BONUS",
}

export interface DiscountLabelBase {
  code: string;
  defaultDescription: string;
}

export interface DiscountFallback extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_FALLBACK;
  price: number;
}

export interface DiscountAmount extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_AMOUNT;
  amount: number;
}

export interface DiscountFixedPrice extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_FIXED_PRICE;
  price: number;
}

export interface DiscountPercentage extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_PERCENTAGE;
  percentage: number;
  precisePercentage: number;
}

export interface DiscountXForY extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_X_FOR_Y;
  count: number;
  price: number;
}

export interface DiscountXPlusYFree extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_X_PLUS_Y_FREE;
  count: number;
  freeCount: number;
}

export interface DiscountWeight extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_WEIGHT;
  count: number;
  price: number;
  unit: "GRAM";
}

export interface DiscountOneHalfPrice extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_ONE_HALF_PRICE;
}

export interface DiscountBonus extends DiscountLabelBase {
  code: DiscountCode.DISCOUNT_BONUS;
}

export type DiscountLabel =
  | DiscountAmount
  | DiscountFixedPrice
  | DiscountPercentage
  | DiscountXForY
  | DiscountFallback
  | DiscountWeight
  | DiscountOneHalfPrice
  | DiscountBonus
  | DiscountXPlusYFree;

export enum OrderAvailabilityStatus {
  IN_ASSORTMENT = "IN_ASSORTMENT",
  NO_LONGER_IN_ASSORTMENT = "NO_LONGER_IN_ASSORTMENT",
  NOT_IN_ASSORTMENT = "NOT_IN_ASSORTMENT",
}

interface Image {
  width: number;
  height: number;
  url: string;
}

export interface Product {
  product: {
    webshopId: string;
    title: string;
    discountLabels: DiscountLabel[];
    hasListPrice: boolean;
    images: Image[];

    // Will sometimes contain extra price information
    // "normale prijs per kg €3.70"
    unitPriceDescription?: string;
    priceBeforeBonus?: number;
    salesUnitSize?: string;
    currentPrice?: number; // ? With DiscountXPlusYFree
    isBonusPrice: boolean;
    isStapelBonus: boolean;
    isBonus: boolean;
    orderAvailabilityStatus: OrderAvailabilityStatus;
    availableOnline: boolean;
    isOrderable: boolean;
  };
}

export interface BonusGroup {
  bonusGroup: {
    id: string;
  };
}

export interface BonusSegment {
  products: Array<Product["product"]>;
}

export interface BonusSection {
  sectionType: string;
  sectionDescription: string;
  bonusGroupOrProducts?: Array<BonusGroup | Product>;
  sectionImage: unknown[];
}

export interface ProductCard {
  productCard: {
    currentPrice?: number;
    salesUnitSize?: string;
  };
}
