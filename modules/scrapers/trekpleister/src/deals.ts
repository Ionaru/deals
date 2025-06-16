interface DealInformation {
  calculation: (price: number) => number;
  code: string;
  purchaseAmount: number;
  requiresCard?: boolean;
}

export enum TrekpleisterDealType {
  // X + Y
  ONE_PLUS_ONE = 1,
  TWO_PLUS_TWO,

  // 3 for €X
  THREE_FOR_5,

  // X% off
  TWENTY_PERCENT_OFF,
  TWENTY_FIVE_PERCENT_OFF,
  FIFTY_PERCENT_OFF,

  // X€ each
  FOR_0_79,

  // Second for €X
  SECOND_FOR_1,
  SECOND_FOR_2,

  // Stapelkorting
  STACK_60_PERCENT_AT_3,

  // Second_Half_Price
  SECOND_HALF_PRICE,
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
  [TrekpleisterDealType.TWO_PLUS_TWO]: {
    calculation: (price: number) => price / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzEzMHxpbWFnZS9wbmd8YUdJNEwyaGpaaTh5T1RrME9Ea3lNakkyTlRZek1BfGQ0ODc3NzI5ZTViMWI2OTM4MGExYjMzYmFlMjkwMTAwMTlhNWI5ZDA3NzIzMjg4M2Q3NjA4NTY1ODM2MjUwMGE",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.THREE_FOR_5]: {
    calculation: () => 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2NHxpbWFnZS9wbmd8YURKaEwyaGpNaTh5T1RrME9Ea3lNalkxT0RnME5nfGMyNTU3NGY3OTVmNzRmZWRmYTY0MDZhYmYzMGM3NTkyZTM3NDI0MjJhM2E4Yjg2ZGQ5NWY3NGVlMzEwNGI0YmY",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.TWENTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODA1NnxpbWFnZS9wbmd8YUdNekwyZzFNUzh5T1RrME9Ea3lNemd6T0RRNU5BfDk5NWFlNGM1YWI2MDJmMWExODUwNzEwOTc3OGUxOWY3NGYwMzgxNjhlOWEzZjJiNzY4N2IxOTZmNDUwYWZiN2U",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.TWENTY_FIVE_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.25,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzk2N3xpbWFnZS9wbmd8YUdJeUwyZzBaUzh5T1RrME9Ea3lNemt3TkRBek1BfDBiZjUyMDE3YTI5NjcwMzUzNGE1YTRjNDE1NmMxNzExNzk1MTY5YmE2MDhiOTEyZjc4OWYzNGI1YTM3OWYwNzc",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FIFTY_PERCENT_OFF]: {
    calculation: (price: number) => price * 0.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODE1NXxpbWFnZS9wbmd8YURNM0wyZ3dOQzh5T1RrME9Ea3lOREk1TnpJME5nfDEzNzcxODc5NTIzMTU4ZTkxZTM4NDMxNjI3NDYxYThmNjM3ZDMwYTVmNTZmMzE4ZGQwMTFiZDhiOTJmMjhiOTE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_0_79]: {
    calculation: () => 0.79,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzYxN3xpbWFnZS9wbmd8YURVMEwyZzNNUzh5T1RrNU9EVXhNakl3T1RrMU1BfDg2M2NjNDg4NGYyZmE2MTNjZGI4YjYzYmRmMDcwYjBkYzU4ZGE0MjhkZGJkYTVlZDNkOWM5OWJjMzQ1ZWM5NjI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.SECOND_FOR_1]: {
    calculation: (price: number) => (price + 1) / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjkxN3xpbWFnZS9wbmd8YUdFMkwyaGpZeTh5T1RrME9Ea3lNak16TVRFMk5nfGVkZjg5YmMwMGFlZjAyZTkwMTMzMjcyM2Y5NzVlNTY2OTM3NTE1MTQ2YzAyM2U5NDA2OGMyNjAwOGJmNzUxMzI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.SECOND_FOR_2]: {
    calculation: (price: number) => (price + 2) / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzM2MXxpbWFnZS9wbmd8YUdNMEwyZzJOaTh5T1RrNU9EVXhNalV6TnpZek1BfGI1OTMyYzIwYzA4OTM2MDBmMmQ0NGQ3ZjMyM2FiMzZjMmJjYjVjNjMxNWZjMmU2ZjhiMTA5NTRmNjBjNDU1Y2Y",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.STACK_60_PERCENT_AT_3]: {
    calculation: (price: number) => price - price * 0.6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8OTc2OXxpbWFnZS9wbmd8YUdNeEwyaGxNaTh5T1RrNU9EVTFOek0yTkRJMU5BfDJiMDExMGIyYTQ0MWY1ZTlkNGU4ZjU4N2ZkNzYyYWUzNWFiNGE4OGI5ZDkwOWY3NTQ1Y2Q5YTU3OTZkNTFhYzE",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.SECOND_HALF_PRICE]: {
    calculation: (price: number) => price * 0.75,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ5MHxpbWFnZS9wbmd8YUdZNEwyaGpZaTh5T1RrME9Ea3lNak01Tmpjd01nfDEzZWNkYTBmOTA3NWEwZDc4YzFhYTMxNDdiMDRlYTRjMmY5MmQ2Y2I0ZWY3ZWUzMzUzMjM0ZGZjYTA2M2ZhNDA",
    purchaseAmount: 2,
  },
});
