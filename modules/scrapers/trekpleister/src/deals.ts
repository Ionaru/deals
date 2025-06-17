interface DealInformation {
  calculation: (price: number) => number;
  code: string;
  purchaseAmount: number;
  requiresCard?: boolean;
}

export enum TrekpleisterDealType {
  // X + Y
  ONE_PLUS_ONE = 1,
  ONE_PLUS_TWO,
  TWO_PLUS_ONE,
  TWO_PLUS_TWO,

  // 2 for €X
  TWO_FOR_2_50,
  TWO_FOR_3,
  TWO_FOR_4,
  TWO_FOR_4_50,
  TWO_FOR_4_99,
  TWO_FOR_6,
  TWO_FOR_7,
  TWO_FOR_9,
  TWO_FOR_10,
  TWO_FOR_13,
  TWO_FOR_14_99,
  TWO_FOR_16_99,
  TWO_FOR_18,
  TWO_FOR_19,
  TWO_FOR_22,
  TWO_FOR_24,
  TWO_FOR_35,
  TWO_FOR_63,
  TWO_FOR_73,

  // 3 for €X
  THREE_FOR_3,
  THREE_FOR_5,
  THREE_FOR_6,
  THREE_FOR_10,
  THREE_FOR_11,
  THREE_FOR_25,

  // 4 for €X
  FOUR_FOR_5,
  FOUR_FOR_8,

  // 5 for €X
  FIVE_FOR_9_99,

  // X% off
  FIFTEEN_PERCENT_OFF,
  TWENTY_PERCENT_OFF,
  TWENTY_FIVE_PERCENT_OFF,
  THIRTY_PERCENT_OFF,
  THIRTY_FIVE_PERCENT_OFF,
  FIFTY_PERCENT_OFF,
  SIXTY_PERCENT_OFF,

  // €X off
  FOUR_OFF,
  FIVE_OFF,

  // X€ each
  FOR_0_79,
  FOR_1_50,
  FOR_2_99,
  FOR_5,
  FOR_6_49,
  FOR_7_99,
  FOR_10_99,
  FOR_12,
  FOR_12_50,
  FOR_13,
  FOR_27_99,
  FOR_33_99,
  FOR_35,

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
  [TrekpleisterDealType.ONE_PLUS_TWO]: {
    calculation: (price: number) => price / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzE3N3xpbWFnZS9wbmd8YURRMUwyZzNNeTh5T1RrNU9EVXlOek0wT0RjMk5nfDVhOTI5M2Q1MWNiZDAxMTUyY2EwMzM4ZGUwMGFlZWRhNTU5ODc4NTAxYzk3ZWVjMzc5MDdjODhkYTk2NzFlZjE",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.TWO_PLUS_ONE]: {
    calculation: (price: number) => (price + price) / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzIwN3xpbWFnZS9wbmd8YURZMUwyaGtNQzh5T1RrME9Ea3lNakl3TURBNU5BfDU1ZWI2MDNhNDE0YTJlYmFhYzAwZWNlZjA4OTI4YzdjOWZiNjBlZjFlYzFhYjNiMjAwNDlkOWY5NWQwZGIyMTg",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.TWO_PLUS_TWO]: {
    calculation: (price: number) => price / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzEzMHxpbWFnZS9wbmd8YUdJNEwyaGpaaTh5T1RrME9Ea3lNakkyTlRZek1BfGQ0ODc3NzI5ZTViMWI2OTM4MGExYjMzYmFlMjkwMTAwMTlhNWI5ZDA3NzIzMjg4M2Q3NjA4NTY1ODM2MjUwMGE",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.TWO_FOR_2_50]: {
    calculation: () => 2.5 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzAyMnxpbWFnZS9wbmd8YURFNEwyZzJNQzh5T1RrME9Ea3lNRE0yTlRBNE5nfDlmYmU2NjRmMGY4MzU1MmFlMjZhOTY0NTczNjE2MDY0ODlhZGIyZTRhMmU4YTk3MTFjNjdjNzE5MWU4ZTRjZmM",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_3]: {
    calculation: () => 3 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg5MXxpbWFnZS9wbmd8YUdRM0wyZzJNeTh5T1RrME9Ea3lNRFE1TmpFMU9BfGQ4NDJlNWUzNDExNDk5MDA5ZGJjMWE0MDg4ZTQ3OTM3OGFmZjc3YmRiMDA2NDNmNjU3NTUxYzkwOTlhYTBjZmE",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_4]: {
    calculation: () => 4 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjYxN3xpbWFnZS9wbmd8YUdFM0wyZzJZUzh5T1RrME9Ea3lNRFk1TWpjMk5nfGQyZDg2N2Q2YmIwMGJiNjFhOWE4MWUzNTFlNDcyMjY0NGJhYTI3MDk0MWViODJkY2RlNDkyMmY0OTgxNzcwYjg",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_4_50]: {
    calculation: () => 4.5 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk1NnxpbWFnZS9wbmd8YURJNEwyZzNZeTh5T1RrNU9EVTFOalEwTmpjMU1BfGM4MzAzZTk1MThkNDNhMDc4YzMwNTVmNzU0MDgxMGNmYmUxYjAxMzdiMmRjZDY3MzM1MTZlODlhOGEwZGEwOWU",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_4_99]: {
    calculation: () => 4.99 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njc0M3xpbWFnZS9wbmd8YURVeUwyZzNOQzh5T1RrNU9EVXhNakUwTkRReE5BfGJiM2MxZGIxYjNiYjZkNWZjMDQwZTk2MTQxZTFjNjAyNmViYjdhYWIyNzRjN2Q2NzFhZjI2YjdiZTViMTZkY2Y",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_6]: {
    calculation: () => 6 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjkxNHxpbWFnZS9wbmd8YURZMUwyZzNNUzh5T1RrME9Ea3lNRGc0T1RNM05BfDM4NzFlMzY0MWY5NzcxMzM3Zjc2ZmIyNmY2NDk5N2E4ZDIyYzI0ZWYxNzk3YmQ3Yjk2NjgxZDBlMTk0Mzk0OTU",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_7]: {
    calculation: () => 7 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjY3MXxpbWFnZS9wbmd8YURNeUwyaGlaaTh5T1RrME9Ea3lNVEF5TURRME5nfGYxNDg5YmQxOTRiYjE5NDk3MGMxMTZlNjM0ODU5ZDI4MDFlMDhiY2M5OGQ4OTE3N2QyZTUwY2Y3ODE3MmVhMmE",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_9]: {
    calculation: () => 9 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjkzNnxpbWFnZS9wbmd8YUdJeEwyaGpOaTh5T1RrME9Ea3lNVEk0TWpVNU1BfDY1YTRlZWFlYmUwNTY1MjVjMDg5N2NhNTI3MTIzMmQzOTIzMWYyNTFmYWE3MWNjNTYyZTc1NTFjMzM2YmQzMGI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_10]: {
    calculation: () => 10 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA2OHxpbWFnZS9wbmd8YURabEwyaGpaQzh5T1RrME9Ea3lNVFEzT1RFNU9BfDRhYjc2ODFiZTgwOTkxMWZkOTgzZDdlMTdkNzU4YjQ4YjdhOTMyYWUxOTlhM2YzZmJlM2RkZThiYTM5ZWE2OWI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_13]: {
    calculation: () => 13 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzEyN3xpbWFnZS9wbmd8YUdKaUwyZ3dZUzh5T1RrNU9EVXhNekV5TnpRMU5BfGViNWNlNTNhNDIyYjFlNDI0NzhjNGZjMzI1ZTljM2QwZDc5Y2U3MTYyMjYyY2E5NTM3NzYyNmU5ZmRjY2FlMmQ",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_14_99]: {
    calculation: () => 14.99 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk1OXxpbWFnZS9wbmd8YURFeEwyZzNPQzh5T1RrNU9EVXhNakF4TXpNME1nfDRhZTNmNDVlZDY2YjQyZDViNzhmMTJiMGFkOWE3OWI2NGI2NDcyYTAwOWIzMGY5MmE5OTlmNGJkNTE0MGZiMWQ",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_16_99]: {
    calculation: () => 16.99 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzIyNnxpbWFnZS9wbmd8YURFNUwyaGtOUzh5T1RrNU9EVTBNREkxT1RNMU9BfGM4YTRkMzA4ZTQ0OWY3YzFkZTkyYmZjZDFiMzVlNzVmNTJhMWY3ZTM0OTYxMzNjMGJiNzYwMzJhNDZjMTg4OWU",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_18]: {
    calculation: () => 18 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzI0N3xpbWFnZS9wbmd8YUdaaUwyZ3dOaTh5T1RrNU9EVXhNekkxT0RVeU5nfGRiMmViMjBhODcwYWE5ZTMxMDdlOTM2NzVmYTVkNmNhMmJmNWZhZTU1MTdjNTBlYTFlN2ZkYzQzNzkwMjY1NWI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_19]: {
    calculation: () => 19 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzI1N3xpbWFnZS9wbmd8YURWakwyZ3dNQzh5T1RrME9Ea3pNakk1TWpZek9BfDdiMWJiOTdmN2JkYjkxMmYyNGVlNjczOTNhMTU2ZmUxYzEwMDFiYTUzZmI3ZGZjMDE4Yjc0OGI2NTdhNGI5ZDI",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_22]: {
    calculation: () => 22 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzAwNnxpbWFnZS9wbmd8YURjMUwyZzFPQzh5T1RrNU9EVXhNams1TmpNNE1nfGU1YzA1NDg1ZGU3Yzk3ZGZlMGYwZDQzNmY4YTQ5M2NmMWM3YjdhMDRiNWE2NTc3MTk5YzMzNjkxN2VhNjhiMzQ",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_24]: {
    calculation: () => 24 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzI5OHxpbWFnZS9wbmd8YURZNEwyZ3lNQzh5T1RrNU9EVXpPVFl3TXprNU9BfDA4MjY0MWYxNmYzYWRiYzQ2M2FjNWIwZjkwNzRjYTJjZGM1N2QyN2Q5YWFlYTIyMWZkOGY3YTdiYzNjMjcyZmU",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_35]: {
    calculation: () => 35 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ4M3xpbWFnZS9wbmd8YURRMEwyaGpZeTh5T1RrNU9EVXhOVEl5TkRZd05nfDI5MTA0MTVhZGY5NzJjZDU5OWQ5M2QzYjExZjRhYWI3MzIwOTg3YmQ2M2IyZmMwMjNlNmFjMjVjMjRkMDIzNDA",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_63]: {
    calculation: () => 63 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODU1MHxpbWFnZS9wbmd8YURSakwyaGhZeTh6TkRReU5EQXhPRFk1T0RJM01BfDJlZWI2ZGE1MGM4YTAwN2YyZTgyOWJlYmYzZWY0OTI4NmEzZmNjNjVjNzQwNTA1OThmOTk4MjUxMGMxYTRlYTg",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_73]: {
    calculation: () => 73 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8MTA1NjB8aW1hZ2UvcG5nfGFETm1MMmcxWXk4ek5ERXlNekF3TXpFNU9UVXhPQXwzYmNmMGJmZDUxMjU2NzFmNWEzOTdjMDBkNzgwNWZiYjE0ZTdkMmY4MjRkNTFhNzkzMDE0Mzc0Njc0ZmNiM2M5",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.THREE_FOR_3]: {
    calculation: () => 1,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg5M3xpbWFnZS9wbmd8YURJNEwyaGpOUzh5T1RrME9Ea3lNalU1TXpNeE1BfDU1ZGZkYmZhMGNjN2IzYjM0Y2UxZmZlMTk3MmZjNzM4ZDE4ZTFjMWU0YWYwZmIwOTYyZTE0ODg5ZGQzZjg4NTc",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_5]: {
    calculation: () => 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2NHxpbWFnZS9wbmd8YURKaEwyaGpNaTh5T1RrME9Ea3lNalkxT0RnME5nfGMyNTU3NGY3OTVmNzRmZWRmYTY0MDZhYmYzMGM3NTkyZTM3NDI0MjJhM2E4Yjg2ZGQ5NWY3NGVlMzEwNGI0YmY",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_6]: {
    calculation: () => 6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk3MnxpbWFnZS9wbmd8YURFNUwyaGlaaTh5T1RrME9Ea3lNamN5TkRNNE1nfGY4MzVmM2FlZGY4YzZjZDYwMTAzZWEwY2FjNzQ0NGFlZTkxOTgzMWYxY2ZlZWM1ZTliMDQxY2U0YzhlMGQ5NmI",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_10]: {
    calculation: () => 10 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA2MHxpbWFnZS9wbmd8YURsaUwyaGlOeTh5T1RrME9Ea3lNams0TmpVeU5nfGYxZDQyYzcwMzk0YTIwYzI3YTc4YWYxNzEwYTUzYjNiYTk0M2MyZWYyOGQ3ZDA2YzU0YmE2ZDQyNjdmN2YzYjQ",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_11]: {
    calculation: () => 11 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjQ2NHxpbWFnZS9wbmd8YURZeUwyZzJZaTh5T1RrNU9EVTFNVFEyTmpBeE5BfDI4NmUxYzhjMjM1Yzc0ZGY2MTEzNzY3ODQ5ZWY4ZjU0ZjM4ODU5NmQxZmEyZGZkNzcxOGJjZjAwODBlNzg5ZjM",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_25]: {
    calculation: () => 25 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQwOHxpbWFnZS9wbmd8YUdRekwyaGpaaTh5T1RrME9Ea3pNRE01TWpBNU5BfGMxYjViMGIxMmFiN2U1Zjk2MjQ3NGUzNGUzMDBjNWMzMGI5ZDBiODBjNjczNzhlZWM3Yzg2MjFkOGM2ZTYxODU",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.FOUR_FOR_5]: {
    calculation: () => 5 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2MnxpbWFnZS9wbmd8YURZeUwyZzJNaTh5T1RrME9Ea3lNek0zT1RjME1nfDMyMWEwODhmNWMwNzFjYWMwMzFjMGE1NDU3MGY3YjU4ZmNjY2Q0MzVjNWI1YjUwN2QwMWJmNzY1N2RkZjNiMzQ",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_8]: {
    calculation: () => 8 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk5NnxpbWFnZS9wbmd8YURVNEwyaGpOUzh5T1RrNU9EVXlNekUxTkRRMk1nfDQ3YjFiZWIxMjhkMDIyNzlhODA0Yjk5MmE0ZDM5MzE4NTI4NGVjZmI4ODBiYjRiMzY5YTUzMTA4NDI2ZGE4NDA",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FIVE_FOR_9_99]: {
    calculation: () => 9.99 / 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzAzNHxpbWFnZS9wbmd8YURaaEwyaGpOeTh5T1RrNU9EVTFNakExTlRnek9BfDhiZjE5NzU2ZjQwNWNhNTJkMzgxYjJkNGIyZjg2NDZkNDQ4YTY1ZDU5YjAwZjhjMGE4N2E4NTNiMzI2ODQxMzk",
    purchaseAmount: 5,
  },
  [TrekpleisterDealType.FIFTEEN_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.15,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzY2MXxpbWFnZS9wbmd8YURneUwyZzFOUzh5T1RrME9Ea3lNemN3TnpReU1nfGRjYThmNjg1MWUwN2U2ZmZkYjUxM2IyOThiNGQ2YTM0NzUzMjFlZGUyYzUyNTY2Y2M4MDJjNWY5Mzc5YTNlNDc",
    purchaseAmount: 1,
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
  [TrekpleisterDealType.THIRTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODE2NnxpbWFnZS9wbmd8YURRM0wyZ3dNeTh5T1RrME9Ea3lOREF6TlRFd01nfDY1NmFkMjllZmUwNTM4ZWJiYzBkNGRmYTNkYTUwOWUzMzljNTQ0NzM2ODY0OGU1Y2NmNGE3NDA5MTdlMjE2MTA",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.THIRTY_FIVE_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.35,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODA0OXxpbWFnZS9wbmd8YURNMkwyZ3dNQzh5T1RrME9Ea3lOREV3TURZek9BfDVkMTA3YWMwOWE5MDE0YmYwYzNiZTRiY2I3ZjJlM2E3MDVjMjkxYjY2MGFlYmQzYjMyZDc4MWQ3N2YwNDkwNjY",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FIFTY_PERCENT_OFF]: {
    calculation: (price: number) => price * 0.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODE1NXxpbWFnZS9wbmd8YURNM0wyZ3dOQzh5T1RrME9Ea3lOREk1TnpJME5nfDEzNzcxODc5NTIzMTU4ZTkxZTM4NDMxNjI3NDYxYThmNjM3ZDMwYTVmNTZmMzE4ZGQwMTFiZDhiOTJmMjhiOTE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.SIXTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODI0NnxpbWFnZS9wbmd8YURnNEwyZzFNUzh5T1RrME9Ea3lPRE0yTURRM09BfDhlM2MyOWRlZmFmMWEzYjQxNzg0NTkzYWRlZjQyN2I5ZDdhOWE1NWFkNzA4NDcyZjA4ZjU2Njk0ZDhmMGYxNzk",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOUR_OFF]: {
    calculation: (price: number) => price - 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzAyNHxpbWFnZS9wbmd8YURGbEwyZzJPUzh5T1RrME9Ea3lNekU0TXpFek5BfDM0NTJjNDNhNTQ2N2YyZmNlYTlmMzA5ZDY5YWNkYTdjMDg2MDgwZDEwY2U1OTVmNmYwYjI5MjU3MjI0N2M0N2M",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FIVE_OFF]: {
    calculation: (price: number) => price - 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzMxN3xpbWFnZS9wbmd8YURVd0wyZzFaaTh5T1RrME9Ea3lNelEwTlRJM09BfGNlZTYyYzk1YTMyZWNmMGM4ZmFkYzFlNzIxODZjYThjNDBmOGEyNTkyYTQ5YzAyNmQwZWQ0MzIzOWEyOGI0N2M",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_0_79]: {
    calculation: () => 0.79,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzYxN3xpbWFnZS9wbmd8YURVMEwyZzNNUzh5T1RrNU9EVXhNakl3T1RrMU1BfDg2M2NjNDg4NGYyZmE2MTNjZGI4YjYzYmRmMDcwYjBkYzU4ZGE0MjhkZGJkYTVlZDNkOWM5OWJjMzQ1ZWM5NjI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_1_50]: {
    calculation: () => 1.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzExMnxpbWFnZS9wbmd8YUdGakwyZzNZUzh5T1RrME9Ea3lOVFl3TnprMk5nfGE1YThmNjE4NjMwMmY1OTgyYjE5MWYwMjkwN2Y4MmIzZDJiZDlhN2IxMmUzNmZiNTkyNDM4MmNhMjZhNTM0MDM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_2_99]: {
    calculation: () => 2.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzY2NnxpbWFnZS9wbmd8YURGa0wyaG1aQzh6TWpRMk16ZzBOemN4T0RrME1nfGZlZDhiZmNjZmYwZDljMDJhOWNmZmIzMjBhM2YwZTE5ODlkMTQ1YjY3OGQ0MTU4ZDMzMzQ0MDY0ODlkYzY5MzQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_5]: {
    calculation: () => 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQyNnxpbWFnZS9wbmd8YURCa0wyZzNaUzh6TWpRNE5qRTJNamM1TWpRM09BfGMzMGI0MTdjNzIzN2E4YmRlZTYxZjUyNGY2ODg1NjUxYzE5ZGU2OTAyNGQzZDcyOTUwNTJmOTk1ZWNhN2FlYjE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_6_49]: {
    calculation: () => 6.49,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzY2OHxpbWFnZS9wbmd8YURCa0wyZ3dNeTh5T1RrNU9EVXhPREEwTWpZMU5BfGRiYmU2NmMwOGI3ODMyNjNkOWMxZDY0NDgxNzg0NzFmYmNmYjQwYjg0MTE4OGVkODlmYjlkMjE0N2M1NjZmZTI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_7_99]: {
    calculation: () => 7.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzM1OHxpbWFnZS9wbmd8YURVMUwyaG1OQzh6TWpJNE5EY3lORFE1TkRNMk5nfDU1ODg3YTg2M2NjOTZiZDU4YTQ2N2M2NTViYTI4ZDQyMDg2MjY5MjdmNTdkNmIxODk0MjIxMjg4ZTg1ZTRkMjE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_10_99]: {
    calculation: () => 10.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzM5NHxpbWFnZS9wbmd8YUdNeEwyaGpOUzh5T1RrME9Ea3lOekEwT1RjMU9BfDc3YmY1Y2MzMGFlNjhjMmViZTUxNjZjNGUyMDllM2U0YzExN2YyZTU2ODZhODNkODdlOGZmYmE0ODVjNmIzZjU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_12]: {
    calculation: () => 12,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzgxN3xpbWFnZS9wbmd8YUdZMkwyZ3pPUzh6TWpNMU9UTXpOVFl5TkRjek5BfDZlYWE0MjdjOThlNjQ5YWZlNTFkYzQ4OGNjNDU3NTQ2M2JhMjk1YjI2OWQ0MmVlMjYzNTQxNjc0MTliMTBhOTU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_12_50]: {
    calculation: () => 12.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzc3N3xpbWFnZS9wbmd8YURkaEwyaGhOeTh6TWpjeE16TTBOVEV3TlRrMU1BfGY0ZTRhNzM2OTc2ZGM3NzU5NzBhZDhkMjY3YTU5MGNhMGY0OWI2NGM0MmU2NTZhMGU1MDI2N2Q3MjgzNjRhYjU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_13]: {
    calculation: () => 13,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODI1N3xpbWFnZS9wbmd8YUdSbUwyZzROUzh6TVRFeE5UTTBPREE0TWpjeE9BfDQ2MWQzODZlNTYwZmRmMWFiMjRlOTdkYTRkYTBkM2EwNTdiMzlkZGQ1ZjU4ZmI5ZmFiMTllZGM1OGE4YTg5NDU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_27_99]: {
    calculation: () => 27.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA0NnxpbWFnZS9wbmd8YUdVM0wyZzNaaTh5T1RrNU9EVTFOalUzTnpneU1nfGExODdiNTNlZDI0OTgyYTAxOTIyNmZiZDZlMjFlM2RjNTBjY2FjNDE0NzllOTNmMDJhZDQ2YjNhZTEwM2M3ODI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_33_99]: {
    calculation: () => 33.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzg1NXxpbWFnZS9wbmd8YUdRekwyZzFaUzh6TXpnNU9EazVNREUzTkRJek9BfDUxOTk1Nzg2ODAyMzQ4YmE0ZDQyZTEzMGIzMDUxMzMyZDQyYTYzYTA4ZWMzZGI0MjI0MjkzN2U3OWJhYzk1ZTU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_35]: {
    calculation: () => 35,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzg4NXxpbWFnZS9wbmd8YURjNEwyZzFOUzh6TXpBM01qTXhOREl5TURVM05BfDk2YTY2YjBiZTU3NTk4YzM1NjNkOTY3Mjg2YjBlNGRmMzk0MDE3NTUzM2M3YjZmMzA1MzQ5NDBkNmI0OWM5NDI",
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
