interface DealInformation {
  calculation: (price: number) => number;
  code: string;
  purchaseAmount: number;
  requiresCard?: boolean;
}

export enum TrekpleisterDealType {
  // X + Y
  ONE_PLUS_ONE = 1,

  FIFTY_PERCENT_OFF,
}

export const trekpleisterDealInformation: Record<
  TrekpleisterDealType,
  DealInformation
> = Object.freeze({
  [TrekpleisterDealType.ONE_PLUS_ONE]: {
    calculation: (price: number) => price / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjU1NnxpbWFnZS9wbmd8YURnNEwyZzFOUzh5T1RrME9Ea3lNREF6TnpRd05nfDFlOTI3YzMwMjcwZGJmMDg1MmMzNzJmZmYxZjk4ZTUxYTdiYzFkNmQ3ZGU1Mzg0NDNhMmVkMGEzZDY5OGU1ODI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.FIFTY_PERCENT_OFF]: {
    calculation: (price: number) => price * 0.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODE1NXxpbWFnZS9wbmd8YURNM0wyZ3dOQzh5T1RrME9Ea3lOREk1TnpJME5nfDEzNzcxODc5NTIzMTU4ZTkxZTM4NDMxNjI3NDYxYThmNjM3ZDMwYTVmNTZmMzE4ZGQwMTFiZDhiOTJmMjhiOTE",
    purchaseAmount: 1,
  },
});
