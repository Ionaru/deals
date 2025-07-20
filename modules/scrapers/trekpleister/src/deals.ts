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
  EIGHT_PLUS_TWO,

  // 2 for €X
  TWO_FOR_2,
  TWO_FOR_2_50,
  TWO_FOR_3,
  TWO_FOR_4,
  TWO_FOR_4_50,
  TWO_FOR_4_99,
  TWO_FOR_5,
  TWO_FOR_6,
  TWO_FOR_7,
  TWO_FOR_8,
  TWO_FOR_9,
  TWO_FOR_10,
  TWO_FOR_10_95,
  TWO_FOR_11,
  TWO_FOR_12,
  TWO_FOR_13,
  TWO_FOR_14_99,
  TWO_FOR_15,
  TWO_FOR_16_99,
  TWO_FOR_18,
  TWO_FOR_19,
  TWO_FOR_19_DUPLICATE,
  TWO_FOR_20,
  TWO_FOR_22,
  TWO_FOR_24,
  TWO_FOR_30,
  TWO_FOR_35,
  TWO_FOR_63,
  TWO_FOR_65,
  TWO_FOR_73,
  TWO_FOR_75,

  // 3 for €X
  THREE_FOR_3,
  THREE_FOR_4,
  THREE_FOR_5,
  THREE_FOR_5_99,
  THREE_FOR_6,
  THREE_FOR_7,
  THREE_FOR_7_49,
  THREE_FOR_9,
  THREE_FOR_10,
  THREE_FOR_11,
  THREE_FOR_13,
  THREE_FOR_25,
  THREE_FOR_28,
  THREE_FOR_47,
  THREE_FOR_53,

  // 4 for €X
  FOUR_FOR_5,
  FOUR_FOR_7,
  FOUR_FOR_8,
  FOUR_FOR_10,
  FOUR_FOR_30,
  FOUR_FOR_35,

  // 5 for €X
  FIVE_FOR_4,
  FIVE_FOR_5_99,
  FIVE_FOR_9_99,

  // 6 for €X
  SIX_FOR_5,
  SIX_FOR_10,

  // 7 for €X
  SEVEN_FOR_16_99,

  // 8 for €X
  EIGHT_FOR_16_99,

  // X% off
  TEN_PERCENT_OFF,
  FIFTEEN_PERCENT_OFF,
  TWENTY_PERCENT_OFF,
  TWENTY_FIVE_PERCENT_OFF,
  THIRTY_PERCENT_OFF,
  THIRTY_FIVE_PERCENT_OFF,
  FOURTY_PERCENT_OFF,
  FIFTY_PERCENT_OFF,
  FIFTY_FIVE_PERCENT_OFF,
  SIXTY_PERCENT_OFF,
  EIGHTY_PERCENT_OFF,

  // €X off
  FOUR_OFF,
  FIVE_OFF,
  TEN_OFF,
  TWENTY_OFF,

  // X€ each
  FOR_0_79,
  FOR_1_49,
  FOR_1_50,
  FOR_2_50,
  FOR_2_99,
  FOR_3,
  FOR_3_99,
  FOR_4_39,
  FOR_4_99,
  FOR_5,
  FOR_6_49,
  FOR_7_99,
  FOR_8,
  FOR_9,
  FOR_9_99,
  FOR_9_99_DUPLICATE,
  FOR_10,
  FOR_10_99,
  FOR_11,
  FOR_11_99,
  FOR_12,
  FOR_12_50,
  FOR_13,
  FOR_14,
  FOR_14_99,
  FOR_14_99_DUPLICATE,
  FOR_15,
  FOR_15_99,
  FOR_19_99,
  FOR_20,
  FOR_24_99,
  FOR_25,
  FOR_26_50,
  FOR_27_99,
  FOR_33_99,
  FOR_35,

  // Second for €X
  SECOND_FOR_1,
  SECOND_FOR_2,

  // Stapelkorting
  STACK_50_PERCENT_AT_5,
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
  [TrekpleisterDealType.EIGHT_PLUS_TWO]: {
    calculation: (price: number) => (price * 8) / 10,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzk1M3xpbWFnZS9wbmd8YURRd0wyZzFZeTh5T1RrME9Ea3lNelV4TURneE5BfDg2MGM2MjJkZjNhZjExMTViNWZiY2IxYzc2ZGViMDNiNzY5ZDNiYTYxMTQ1YWUwZjkyZDhjZGE2Zjg5ZDg4MDU",
    purchaseAmount: 10,
  },
  [TrekpleisterDealType.TWO_FOR_2]: {
    calculation: () => 1,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njc1OXxpbWFnZS9wbmd8YURBM0wyZzFaQzh5T1RrME9Ea3lNREk1T1RVMU1BfDBkZDQ4ZTM1N2NjOTc1OGIzYTU0Njc4MWM0YjI2ZTJkNWViM2Y5YzMxMWYyMjYxNTgxYjk5NGYwZDg4MzY5ZGM",
    purchaseAmount: 2,
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
  [TrekpleisterDealType.TWO_FOR_5]: {
    calculation: () => 5 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjgyN3xpbWFnZS9wbmd8YUdFMUwyZzJaQzh5T1RrME9Ea3lNRGMxT0RNd01nfGU2YTMzNTdmMjJkNzUyODA3M2E1NGI1N2FlYmQyYWE3MDBiZWRmODk2YTAyZTFiMjhiMGI0M2I1ODU2YTM3MDU",
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
  [TrekpleisterDealType.TWO_FOR_8]: {
    calculation: () => 8 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk3OHxpbWFnZS9wbmd8YUdZeEwyaGpNaTh5T1RrME9Ea3lNVEUxTVRVeE9BfDgwMzU2M2Y3ZjAwY2Y4ODIzYWE1ZGYwY2RlZDhjMjZjNzA4ZGY4MzhkOGQ5NjNkMTBhMWY4ZGZhYmFjOGU3ZjY",
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
  [TrekpleisterDealType.TWO_FOR_10_95]: {
    calculation: () => 10.95 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQwMXxpbWFnZS9wbmd8YUdSaEwyaGtaUzh5T1RrNU9EVTFNamN4TVRFNU9BfGE2OTg1OGUyYmJjZWE4MDYzMDNjZGZiYmI2N2EwYjZkYTBhYjhkMTE3OTVlZThlMTQwZTI3MDc0MDg3OWM2Zjk",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_11]: {
    calculation: () => 11 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjQyOXxpbWFnZS9wbmd8YURrd0wyaGtNeTh5T1RrME9Ea3lNVFl4TURJM01BfGY3MjVmYWFiNDg0ZTg0ZTI2N2VlNjE3NzFkODc0MDJlNmI2MTdjZjI5NmE2ODY4MGRjY2FjN2JlNWYyZDBmYmE",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_12]: {
    calculation: () => 12 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjkzOXxpbWFnZS9wbmd8YURObEwyaGtOQzh5T1RrME9Ea3lNVFkzTlRnd05nfDA1MjViYjBlZjUwMDQ5OGY3OTJmNWZhODgzMjQ4MWUxOTE1MDdhYjhhMzc4YThjMDhhNDY3NDU5YjE4YjRjNWU",
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
  [TrekpleisterDealType.TWO_FOR_15]: {
    calculation: () => 15 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzExNHxpbWFnZS9wbmd8YURsaUwyZ3lOUzh5T1RrME9Ea3lPVGN6Tmpjek5BfDQxNDBkZjE5MjkzMTEwMTczYTZhZjEzYTRiZjg5OTgzNmI2ZmExNjU4YjViNDQ1YmMzMmNiOThhZjEzOGI0MDg",
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
  [TrekpleisterDealType.TWO_FOR_19_DUPLICATE]: {
    calculation: () => 19 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzE1MHxpbWFnZS9wbmd8YURNMkwyaGtOeTh5T1RrME9Ea3lNakF3TXpRNE5nfGM1ZGQ5Njg3YzExYjI3MDZhNzJlZDRhYzhkMzI2Njc0YWM2MTVhZWFkODMwMmNmMWM0NjA5ZGQ5NmUyMTMxZDM",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_20]: {
    calculation: () => 20 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQxMXxpbWFnZS9wbmd8YURnNEwyaGtOaTh5T1RrME9Ea3lNakEyT1RBeU1nfGVlOTdlMDE5NmU1NjViNTRhMjg1ZjdhZjI0ZjYyMDEzZTRjMjNlYmQ0Y2VkMjUyZWIyNDRlMzExM2U5MmM2Zjc",
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
  [TrekpleisterDealType.TWO_FOR_30]: {
    calculation: () => 30 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzU2MXxpbWFnZS9wbmd8YURjMEwyaGpOUzh5T1RrNU9EVXhOVEF5TnprNU9BfGZjNWIzYmY0Nzc5Y2U1ZjhjM2Q2NTQwNTYwOGVhODU2NDVhYmRlZTI1Y2UyZTlmNzkzZTFjYzRlMTNlYWY1ZWQ",
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
  [TrekpleisterDealType.TWO_FOR_65]: {
    calculation: () => 65 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODUyMHxpbWFnZS9wbmd8YURKaEwyZ3haUzh6TVRBeU5qQXpOemM0TkRZd05nfGFkNzhkMjM2MDJmZDU0OTQxODc5ZjY1YTNiNWQzNzExZWY2YWNkZjg0Yzc4ZGI4MmQzNjU5ZmNkNjUwZWQ5MjQ",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_73]: {
    calculation: () => 73 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8MTA1NjB8aW1hZ2UvcG5nfGFETm1MMmcxWXk4ek5ERXlNekF3TXpFNU9UVXhPQXwzYmNmMGJmZDUxMjU2NzFmNWEzOTdjMDBkNzgwNWZiYjE0ZTdkMmY4MjRkNTFhNzkzMDE0Mzc0Njc0ZmNiM2M5",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.TWO_FOR_75]: {
    calculation: () => 75 / 2,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODA5MHxpbWFnZS9wbmd8YUdReUwyaGxZeTh6TXpNek9URTFNVE0xTVRnek9BfDY4MzYyZTg4NjEzODYzY2U5YjAwNGZkYTJhYmY5NjkwMzM4NzRmZTFiM2E0M2FhZjVmMjM1ZDc2MzdkZDUyYTA",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.THREE_FOR_3]: {
    calculation: () => 1,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg5M3xpbWFnZS9wbmd8YURJNEwyaGpOUzh5T1RrME9Ea3lNalU1TXpNeE1BfDU1ZGZkYmZhMGNjN2IzYjM0Y2UxZmZlMTk3MmZjNzM4ZDE4ZTFjMWU0YWYwZmIwOTYyZTE0ODg5ZGQzZjg4NTc",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_4]: {
    calculation: () => 4 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjY1NHxpbWFnZS9wbmd8YURWaUwyZ3lPUzh5T1RrME9Ea3lPVGcyTnpnd05nfGNkZjcxMTY1NTVmZTIyZTIyMzI4Nzk2ZGFiNWYyNTkzZmEwYTQ1YzZiNDZlNDMyZTg1MWVjNTE3OWU3NDU5MTc",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_5]: {
    calculation: () => 5 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2NHxpbWFnZS9wbmd8YURKaEwyaGpNaTh5T1RrME9Ea3lNalkxT0RnME5nfGMyNTU3NGY3OTVmNzRmZWRmYTY0MDZhYmYzMGM3NTkyZTM3NDI0MjJhM2E4Yjg2ZGQ5NWY3NGVlMzEwNGI0YmY",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_5_99]: {
    calculation: () => 5.99 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg0NHxpbWFnZS9wbmd8YUdaa0wyZ3hOQzh5T1RrME9Ea3lPVEkzTnprNE1nfDQ1NTcwNDJkY2EzMjJkOGNlYzg5ZWQ0MDdmYTBmZjMxYzY0OTQ3ODU2YzdjZTM4OWRlZDI2YWM4ZGZlYjk4MGU",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_6]: {
    calculation: () => 6 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk3MnxpbWFnZS9wbmd8YURFNUwyaGlaaTh5T1RrME9Ea3lNamN5TkRNNE1nfGY4MzVmM2FlZGY4YzZjZDYwMTAzZWEwY2FjNzQ0NGFlZTkxOTgzMWYxY2ZlZWM1ZTliMDQxY2U0YzhlMGQ5NmI",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_7]: {
    calculation: () => 7 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjcwNHxpbWFnZS9wbmd8YUdSbUwyZzFNUzh5T1RrME9Ea3pNVGsyTkRrMU9BfDRlY2UwODEzNTFjN2JkY2MyZWNiZWRkNjVmYjk3MmQ0MGQyNDg5NWY1Y2ViZjUwMzQ0YTMyODVlZDIwM2RlMWM",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_7_49]: {
    calculation: () => 7.49 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2NHxpbWFnZS9wbmd8YUdNMkwyZzFOeTh5T1RrNU9EVTFORFF4TlRFek5BfDYxMDBkM2UwOTcwMzc4YmQ3NTFiYmZkMWZmMmFiYmE0OTAyNGFiNWY5YjhjNWI0ODM4YTBhZTdmYmNlODdlN2U",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_9]: {
    calculation: () => 9 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk0NHxpbWFnZS9wbmd8YURRNUwyaGlPQzh5T1RrME9Ea3lNamt5TURrNU1BfDZkNWVkOTNlM2Y1Mzc3ODZkNGFhOGY1YjBhMmFlYzdmYmEzODVjNTIwZjhlYzlhZjlmOWVjYzE2MTNiODU2MTE",
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
  [TrekpleisterDealType.THREE_FOR_13]: {
    calculation: () => 5.99 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzExN3xpbWFnZS9wbmd8YUdVM0wyZ3dOeTh5T1RrNU9EVTBNakE1TkRNMk5nfDVlODI2NzIyYTk4NjQwZWZkZjRhZDRkMGRhMDE5YWUxMWRkMGI1MzQ5ZmZiNDE0MDYzOGMzMWEyYzllZmM3YWE",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_25]: {
    calculation: () => 25 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQwOHxpbWFnZS9wbmd8YUdRekwyaGpaaTh5T1RrME9Ea3pNRE01TWpBNU5BfGMxYjViMGIxMmFiN2U1Zjk2MjQ3NGUzNGUzMDBjNWMzMGI5ZDBiODBjNjczNzhlZWM3Yzg2MjFkOGM2ZTYxODU",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_28]: {
    calculation: () => 28 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzU1MnxpbWFnZS9wbmd8YURRM0wyZzFNQzh5T1RrNU9EVTFORFkzTnpJM09BfDNjNmIyNTllNjkxNWI1NTlmZGRkMzkxNGFiNGZjMzhiODE4YWMyZDc5NmM2YzQ1MzBlNWEyN2EzN2Q2ZmQ4ODI",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_47]: {
    calculation: () => 47 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzk4M3xpbWFnZS9wbmd8YURsaEwyZ3paaTh6TXpnMU1qWTRPVFUwTnpJNU5BfDEzZDM3MTdiZjhlNjJkYzAxM2FmZDIzOTdjNTBkOTE3NDU3NmM2OTJhMDNiZTI1MjU4ODkxOTZiNGFkNjA0NGU",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.THREE_FOR_53]: {
    calculation: () => 53 / 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODQxMXxpbWFnZS9wbmd8YURnMUwyZzJZeTh6TXpFNU9UazJOems1TXpnNE5nfDcwY2MwNmE5OTFiMjc0NDM1YTkyNDBkMjcyYTgwY2JkNDJhODA4MDc2OGE2MzQ3NzMzYmNmOGViYThiNzNmYjc",
    purchaseAmount: 3,
  },
  [TrekpleisterDealType.FOUR_FOR_5]: {
    calculation: () => 5 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg2MnxpbWFnZS9wbmd8YURZeUwyZzJNaTh5T1RrME9Ea3lNek0zT1RjME1nfDMyMWEwODhmNWMwNzFjYWMwMzFjMGE1NDU3MGY3YjU4ZmNjY2Q0MzVjNWI1YjUwN2QwMWJmNzY1N2RkZjNiMzQ",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_7]: {
    calculation: () => 7 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjY5M3xpbWFnZS9wbmd8YURnMkwyZ3dPUzh5T1RrNU9EVXlNVGcwTXpjME1nfGY5YmE5OGVlYzhiNzEwODc2ZWY1MTg2YTA3OWIxZjhiZmQyNDQ0NjUxZjM5Zjk0M2YxZDNkZmM3NDRlZjY2MDE",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_8]: {
    calculation: () => 8 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njk5NnxpbWFnZS9wbmd8YURVNEwyaGpOUzh5T1RrNU9EVXlNekUxTkRRMk1nfDQ3YjFiZWIxMjhkMDIyNzlhODA0Yjk5MmE0ZDM5MzE4NTI4NGVjZmI4ODBiYjRiMzY5YTUzMTA4NDI2ZGE4NDA",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_10]: {
    calculation: () => 10 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA2OHxpbWFnZS9wbmd8YURKaUwyZzJNeTh5T1RrME9Ea3pNVFEwTURZM01BfDA2Mzk4MzI3NjdiZTY4ZGQ5Yzk2MzBkNmYwZGE1YTliZWFjMDdjYzYxNmQ0NTliOGUwZDg5OTE2MjkzNGFkZjY",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_30]: {
    calculation: () => 30 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzUwNnxpbWFnZS9wbmd8YURCa0wyZ3dOQzh5T1RrNU9EVXpOREE1T0RrM05BfGFkZGQzNjE2ODUzMTJjMjE5ODdmMzdmODU3MzNlOTY5N2EyYmQ2YTJmYjA4ZGI1ZGIzYzI1MTU3MGNiZjJmZjk",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FOUR_FOR_35]: {
    calculation: () => 35 / 4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODQ1NXxpbWFnZS9wbmd8YURobUwyZzRZeTh6TXpVM01UazFPREF6TURNMk5nfGU1ZjY2NzU5NTRlYzA4Yjk2M2I3YWU0MTA5MmU3Yzc2ZmQxYzQyZDgyYjIxMGExNTdhMjMwMzJhMWY5NzkxZTk",
    purchaseAmount: 4,
  },
  [TrekpleisterDealType.FIVE_FOR_4]: {
    calculation: () => 4 / 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjY3N3xpbWFnZS9wbmd8YUROaUwyZzBNQzh5T1RrME9Ea3lPRGc0TkRjMk5nfGQ5YTYxM2Q3MmUyYmRlMWQ5NDU0NmZmNjMxNjgzMzFmMDI2ZDczZDI2ZWMyMWJlZWM0MjFiZjA2MTY5MmRmYTc",
    purchaseAmount: 5,
  },
  [TrekpleisterDealType.FIVE_FOR_5_99]: {
    calculation: () => 5.99 / 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg3NXxpbWFnZS9wbmd8YURjNUwyZzJNUzh5T1RrNU9EVTBOakF5TmpVeU5nfDVhNGNkY2M4OWQ0OGVjNzYwNDRlMzM1NmEyMWVhNjQzZDkyMDlkN2FhNjBiMDFkNTNjNWNhNGZlYTE1M2ZkMmU",
    purchaseAmount: 5,
  },
  [TrekpleisterDealType.FIVE_FOR_9_99]: {
    calculation: () => 9.99 / 5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzAzNHxpbWFnZS9wbmd8YURaaEwyaGpOeTh5T1RrNU9EVTFNakExTlRnek9BfDhiZjE5NzU2ZjQwNWNhNTJkMzgxYjJkNGIyZjg2NDZkNDQ4YTY1ZDU5YjAwZjhjMGE4N2E4NTNiMzI2ODQxMzk",
    purchaseAmount: 5,
  },
  [TrekpleisterDealType.SIX_FOR_5]: {
    calculation: () => 5 / 6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Njg3M3xpbWFnZS9wbmd8YURKaEwyZ3paQzh5T1RrME9Ea3lPRGsxTURNd01nfDY4YTBlMDI4NGMwMzQzNjZlY2E2ZmRjOTg5NTRhZDhmMjQ3MDZhMGMxMTg0M2E4MDA5OTQ4NmI1YWRiNWUwY2Y",
    purchaseAmount: 6,
  },
  [TrekpleisterDealType.SIX_FOR_10]: {
    calculation: () => 10 / 6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA5N3xpbWFnZS9wbmd8YUdZMEwyZzFPUzh5T1RrNU9EVXpNelkwTURJeU1nfGZjMDM5MTRhMmI0OTMzNWE0MTg0MGVhZmVjOTI4NDFiYmI0MjAwOTMwMzkzZDMzYmI0ZDZhN2RlMTQ4M2RjN2E",
    purchaseAmount: 6,
  },
  [TrekpleisterDealType.SEVEN_FOR_16_99]: {
    calculation: () => 16.99 / 7,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODMwNXxpbWFnZS9wbmd8YURVMkwyZzFNaTh6TURVNU16RTVOalV5TXpVMU1BfDY3YzdlYjZhMWM1YzUzMDRmYzFkNTg2ZGU2NjM0YTllNDcwZDBlNjMwZjE3MjU5NGQ0N2YwOTJjZmVmMjIwNzI",
    purchaseAmount: 7,
  },
  [TrekpleisterDealType.EIGHT_FOR_16_99]: {
    calculation: () => 16.99 / 8,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODQzN3xpbWFnZS9wbmd8YURBMEwyZzFNeTh6TURVNU16RTVOalU0T1RBNE5nfGIxMmEwYmQ3NzhlMjg0ZDhlOWJhMDE2OWNkYTQxMmU1NmEwMzUzMzIyYzVmODliMjdkZDk5NDdkOWNiMzNlNDk",
    purchaseAmount: 8,
  },
  [TrekpleisterDealType.TEN_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.1,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzczMnxpbWFnZS9wbmd8YURnd0wyZzFPQzh5T1RrME9Ea3lNelkwTVRnNE5nfDE3M2YwOGFmYzg4Yzc3YWQzZDExNGYzY2YzM2MxNDQ2MzQ2YmY1ZjhiNTUyMzBhZThiZDI2YmYxZjViMzYzNDg",
    purchaseAmount: 1,
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
  [TrekpleisterDealType.FOURTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.4,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzk3MXxpbWFnZS9wbmd8YURnNEwyZ3dNeTh5T1RrME9Ea3lOREl6TVRjeE1BfDk2OWZjZmU4ZTlhYThjZWRjZGYwZTliOGQwMDIyYjM5YTMxYjMyNTU5Yzg5NzAxYTMzZWU2MjMyN2RmNjc3YjQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FIFTY_PERCENT_OFF]: {
    calculation: (price: number) => price * 0.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODE1NXxpbWFnZS9wbmd8YURNM0wyZ3dOQzh5T1RrME9Ea3lOREk1TnpJME5nfDEzNzcxODc5NTIzMTU4ZTkxZTM4NDMxNjI3NDYxYThmNjM3ZDMwYTVmNTZmMzE4ZGQwMTFiZDhiOTJmMjhiOTE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FIFTY_FIVE_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.55,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzY3OHxpbWFnZS9wbmd8YURrNUwyZzFOQzh5T1RrME9Ea3lPREk1TkRrME1nfDIyNDUxZmI4ZTJhY2UxMTg0MzgyNzBjMGYzMjVmMTkyYzFlYjE4OTFhNDg3ZWFlMmVhM2E3NTZjYjA4NjA2ZDM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.SIXTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.6,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODI0NnxpbWFnZS9wbmd8YURnNEwyZzFNUzh5T1RrME9Ea3lPRE0yTURRM09BfDhlM2MyOWRlZmFmMWEzYjQxNzg0NTkzYWRlZjQyN2I5ZDdhOWE1NWFkNzA4NDcyZjA4ZjU2Njk0ZDhmMGYxNzk",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.EIGHTY_PERCENT_OFF]: {
    calculation: (price: number) => price - price * 0.8,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODIzMHxpbWFnZS9wbmd8YUdKaEwyaGlOUzh5T1RrNU9EVXlPVFEwTlRreE9BfGJkOGZlNTY5MmZiYTk1MjdkMmE3MDJkOWRlZDdiY2Y2NThjZjJlNWY1MDcyYTc5NzM0NDdjOWE5MWZjMDI5MGI",
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
  [TrekpleisterDealType.TEN_OFF]: {
    calculation: (price: number) => price - 10,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzUxNHxpbWFnZS9wbmd8YURreEwyZzFZaTh5T1RrME9Ea3lNelUzTmpNMU1BfGY5ZWM0ZDMzZDJlYzcyYjlhODQ4ZWIwNTRjMmJiMjhkOTM1OTE2MTkzODJkY2FlYjk3Y2NlYmUxZGRhMDRlOTE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.TWENTY_OFF]: {
    calculation: (price: number) => price - 20,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzg5M3xpbWFnZS9wbmd8YURCa0wyZzJaQzh5T1RrME9Ea3pNVEUzT0RVeU5nfGZkMjEwZTQxMTc4MjQwOWJlNGM1MGZhYjcxZjlhZWIxZTIxNWM0ODc0YzI3M2Y3NTIxNTUyYThjYTAyYjBmYzM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_0_79]: {
    calculation: () => 0.79,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzYxN3xpbWFnZS9wbmd8YURVMEwyZzNNUzh5T1RrNU9EVXhNakl3T1RrMU1BfDg2M2NjNDg4NGYyZmE2MTNjZGI4YjYzYmRmMDcwYjBkYzU4ZGE0MjhkZGJkYTVlZDNkOWM5OWJjMzQ1ZWM5NjI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_1_49]: {
    calculation: () => 1.49,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzM2NXxpbWFnZS9wbmd8YURBM0wyZ3paQzh6TWpNMU9UTXpOVFUxT1RFNU9BfDYzZjk4NGNhNjBjZWJhMzcyNjNhYTljMGQwNjViZTJjN2VkMmI4NzA5MzVmNWM5ZjA3ZGRiY2U5OTg1Y2NiODc",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_1_50]: {
    calculation: () => 1.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzExMnxpbWFnZS9wbmd8YUdGakwyZzNZUzh5T1RrME9Ea3lOVFl3TnprMk5nfGE1YThmNjE4NjMwMmY1OTgyYjE5MWYwMjkwN2Y4MmIzZDJiZDlhN2IxMmUzNmZiNTkyNDM4MmNhMjZhNTM0MDM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_2_50]: {
    calculation: () => 2.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzczMHxpbWFnZS9wbmd8YURSaEwyaGpPQzh6TWpNM05qRXpNelV4TnpNME1nfDMwZDJhODExZWIyZGY5MmYyZDQ1NDI2MWFlY2YxYWFkZWUzOWZkMjE5OGMzOTZmN2ViNzQ3ZTU2NDhmYzUzNjI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_2_99]: {
    calculation: () => 2.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzY2NnxpbWFnZS9wbmd8YURGa0wyaG1aQzh6TWpRMk16ZzBOemN4T0RrME1nfGZlZDhiZmNjZmYwZDljMDJhOWNmZmIzMjBhM2YwZTE5ODlkMTQ1YjY3OGQ0MTU4ZDMzMzQ0MDY0ODlkYzY5MzQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_3]: {
    calculation: () => 3,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzU3NHxpbWFnZS9wbmd8YURSbEwyZzBZaTh6TURrME1EWTRNakV5TlRNME1nfGUwZWM2M2IxYTQ0MzEyOGQxZjgyZTMxMDU0ZGE0MWJkMDE3MGRiYjQ4M2NkNDdlZmUzNWI5YmVmNmIwMjRmMjk",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_3_99]: {
    calculation: () => 3.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ0MnxpbWFnZS9wbmd8YUdJMkwyaGtPUzh5T1RrNU9EVXlNemMwTkRJNE5nfDY5ZWZlOWJjOWI1MWMwY2FiMWMwMmYzMGJhMzI5ODk1ODdhMmFmNzAxYjMzMDk3NTVlMDZiYzdmYTgyOWNjN2Y",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_4_39]: {
    calculation: () => 4.39,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzczOHxpbWFnZS9wbmd8YURrNUwyZzBNaTh6TXpnMU1qWTRPVFE0TVRjMU9BfDYyZWM4Y2M5YTg2YjZmYmMxYWQzZDk3Njc2MTM2Njk4MTY0ZmFhZGUwNTNiMGFiYWNjZjg3YzNkMWUwYzU4NjY",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_4_99]: {
    calculation: () => 4.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ5OXxpbWFnZS9wbmd8YUdNMkwyZzBNQzh6TWpNMU9UTXpOVFF5T0RFeU5nfDVlYmFhNGY1ZjdkNjdkNzIwM2RhZWE2ODliMWIzNGYyY2ZhN2FhYjM2ODQxNWE3MGQ0ZDUwN2FiZDVlNTE2OTM",
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
  [TrekpleisterDealType.FOR_8]: {
    calculation: () => 8,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzc2MnxpbWFnZS9wbmd8YURVeEwyaG1NQzh6TWpRMk16ZzBOek01TVRJMk1nfDU3NjZjYzViOTg1NGVmNmZiNjJlYzM4NjQxNzJiNjg3OTNlMzI2MjgyMjEzOWQyOGExMzRlYTFmMTk5ODY3NWQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_9]: {
    calculation: () => 9,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ1NXxpbWFnZS9wbmd8YURZM0wyZzFNaTh6TXpBM01qTXhOREUxTlRBek9BfDZhZWU1NWExNzUwYTNjZTBiNjZmOGEwZmEwOWI1ZTg2ZTQ3ZTkwNmI4YTdhYmZmNWU3M2VmZDc0N2NiZGRhYjY",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_9_99]: {
    calculation: () => 9.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzc1OHxpbWFnZS9wbmd8YURWakwyZzFPQzh6TWpFMk1qQTRPVE0yT1RZek1BfDk0MGU4OThhOGE2OTdkNmIxYzcxM2MxNjg5YjZkNDgxMDBiMmNhYmY3YWFmZjgzNjEzZmJhOTk3NTk3MzdmMTE",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_9_99_DUPLICATE]: {
    calculation: () => 9.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ2MHxpbWFnZS9wbmd8YUdRekwyaGxaUzh5T1RrME9Ea3lOamt4T0RZNE5nfDkwMzQ5MzA3NGE3MDdhY2Y5MzQ2NzQ1OThmYmEyMjIwNTljOTFjYzMzNzhlZTY0N2U1NmQyYzYzMmMzNDFiZjg",
    purchaseAmount: 2,
  },
  [TrekpleisterDealType.FOR_10_99]: {
    calculation: () => 10.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzM5NHxpbWFnZS9wbmd8YUdNeEwyaGpOUzh5T1RrME9Ea3lOekEwT1RjMU9BfDc3YmY1Y2MzMGFlNjhjMmViZTUxNjZjNGUyMDllM2U0YzExN2YyZTU2ODZhODNkODdlOGZmYmE0ODVjNmIzZjU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_10]: {
    calculation: () => 10,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjgyNXxpbWFnZS9wbmd8YURNNUwyZzNaaTh5T1RrNU9EVTFOalV4TWpJNE5nfGU4M2ZhNjhlOGJlZTE2OTZjNTI0MDU2NjI5YjBmYjZmNzljNmMyZGQ4MTI4NGIwYTJjMDc1ZDYzOTY0ZmMzNGU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_11]: {
    calculation: () => 11,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzA0MnxpbWFnZS9wbmd8YURnMUwyZ3dZeTh5T1RrNU9EVXlNVGt3T1RJM09BfDJlNDEwOGM2YzA4NGE5OTg4M2JlMDA4YmQzODI0OGM1ZGQzZTNlZTI1MGY1N2MyYWU5YzYzYmQxNDg0N2EwOTg",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_11_99]: {
    calculation: () => 11.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzE0MnxpbWFnZS9wbmd8YUdVd0wyaG1aUzh6TWpVMk1UTTNNRGd5TkRjek5BfDkyYTcxZDA5NDEwZDkxMWFmMzBiNzRmMDMyYWFkMDQ0NTI4ZDJhMmRkZTNhY2MwYWMxZmIyZDVlZWFjN2EwN2Y",
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
  [TrekpleisterDealType.FOR_14]: {
    calculation: () => 14,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzc2M3xpbWFnZS9wbmd8YUdFd0wyZzNOQzh6TURjMU56UTFNVEl3TWpVNU1BfDllYjExYjQ0MDAxNGZkNTQyZjg4YzE3ZjNjZmJkNzA1ZmE5ZTA0ZWFmNjgyOThlYThiNDY4OTg3MjEwNjQ1ZmM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_14_99]: {
    calculation: () => 14.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzk0NXxpbWFnZS9wbmd8YUROaEwyZzFNaTh6TWpFMk1qQTRPVFV3TURjd01nfDg1NWM2MGE3ZmI4ZDU2ODk4ZWM5MmM1OWEzMWUxY2IyZGQ1ZWZlZmVjMzc5N2VkNjZiZDA1MTM4NGUyOTE5ZmM",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_14_99_DUPLICATE]: {
    calculation: () => 14.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzQ2NHxpbWFnZS9wbmd8YUdZMEwyZzFaaTh5T1RrNU9EVXhNamN6TkRJek9BfDIxZWU4MjNjNTUxNTI1OGEwYWY1ZTI2Yzk4NzhmMzU0MmY1OTdiYzQ1OGY1NDYwMGI1OWM5NGE0ZDQwYmQ4NWI",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_15]: {
    calculation: () => 15,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzUyM3xpbWFnZS9wbmd8YUdJd0wyaGpNaTh5T1RrME9Ea3lOekV4TlRJNU5BfDY3MjllNTM5MTZjZjljMWQwMDgzMGM0OTAzZmJiNTZkNDZmNmZmMDE5YjFhNTIwNTZiNWY1MTBhMWUyMDI0MmY",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_15_99]: {
    calculation: () => 15.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NzkwMnxpbWFnZS9wbmd8YURneEwyaGxPUzh6TWpRMk16ZzBOekU1TkRZMU5BfGVhNWIxMjcyMjA2ZGQyYjFmOGJmYjg4NGZlMWE3NzA3MGM2ZTFhYmM0YTFiN2Y3NTk2YzI0NzExMWVhNmYzYjA",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_19_99]: {
    calculation: () => 19.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODA4OXxpbWFnZS9wbmd8YURreUwyaGxZeTh6TWpRMk16ZzBOekkyTURFNU1BfDhlN2JmMWFmNDU0YzExNmJlMjkwZGI5OWI0ZTcxN2VhN2Q4NDE1MzEwNWMzYmFkZmQ1ZWJjMWI4N2QxMDE4YWU",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_20]: {
    calculation: () => 20,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8Nzg4MHxpbWFnZS9wbmd8YUdZeEwyaGlaUzh5T1RrME9Ea3lOekkwTmpNMk5nfGM5ZDNkMmUxNTI4MGQxNDNlZjVlNTA5NjU3ZDg5MTJmMzU0YWU4MDc5MGI4MzQxZmRmYTczMTNiNzU0MjBkNGQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_24_99]: {
    calculation: () => 24.99,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODI1MHxpbWFnZS9wbmd8YURCaUwyZzRNUzh6TWpRNE5qRTJNamcxT0RBeE5BfDdhNTZkYTExZmU4MmVmZGMwYmMyYzdmZDllNGM5ZTI5YjdlYjY1MjdjMGYyN2M3MTkzYWU5OGQ2YWE0MjRmMzc",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_25]: {
    calculation: () => 25,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODIzMHxpbWFnZS9wbmd8YURoaEwyZ3pZeTh6TXpnMU1qWTRPVFl4TWpnek1BfDY2MTBlMzlmNGE4YzBjYjY1NTc3YWJjZjFkMTg3MGFjMTA3ODhlMDA3YWI5N2JiNGM2ZDkwZTAyZDY0MzFkZDQ",
    purchaseAmount: 1,
  },
  [TrekpleisterDealType.FOR_26_50]: {
    calculation: () => 26.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8ODUyN3xpbWFnZS9wbmd8YURJNEwyZzBaQzh6TXpnMU1qWTRPVEUxTkRBM09BfDU1ZTFhMTIxOGM3ZmM1ZTU5ODI0Y2Q3N2RlMWNkMzRkZWZkZTJlNGM3YzM3ZWIyOTdlYTgyZjQ4MDZiYmMwMjQ",
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
  [TrekpleisterDealType.STACK_50_PERCENT_AT_5]: {
    calculation: (price: number) => price - price * 0.5,
    code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8OTY3N3xpbWFnZS9wbmd8YUdNNEwyZ3dOQzh5T1RrNU9EVTFNRFUwT0RVeE1BfDg4MDExZTY1NmJkYjNkNzcxMDE0MGVmZGRlNDcyYWQxMGE2MGY2N2ZiZjdiYmE1MTRlZTQ4OGUwNWVkY2Y3YzA",
    purchaseAmount: 5,
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
