import { IProductDeal } from "@deals/api";
import { ScrapeWebsiteService } from "@deals/scraper-service";

interface IDealInformation {
  calculation: (price: number) => number;
  code: string;
  purchaseAmount: number;
}

enum KruidvatDealType {
  // X + Y
  ONE_PLUS_ONE = 1,
  ONE_PLUS_ONE_DUPLICATE,
  TWO_PLUS_ONE,
  TWO_PLUS_TWO,
  TWO_PLUS_THREE,
  THREE_PLUS_TWO,
  SIX_PLUS_ONE,

  // 2 for €X
  TWO_FOR_10,
  TWO_FOR_10_95,
  TWO_FOR_11,
  TWO_FOR_12,
  TWO_FOR_13,
  TWO_FOR_18,
  TWO_FOR_2,
  TWO_FOR_2_50,
  TWO_FOR_20,
  TWO_FOR_29_99,
  TWO_FOR_3,
  TWO_FOR_4,
  TWO_FOR_4_49,
  TWO_FOR_4_50,
  TWO_FOR_4_69,
  TWO_FOR_5,
  TWO_FOR_6,
  TWO_FOR_7,
  TWO_FOR_7_50,
  TWO_FOR_8,
  TWO_FOR_9,
  TWO_FOR_9_95,
  TWO_FOR_9_99,
  TWO_FOR_14,
  TWO_FOR_15,
  TWO_FOR_16,
  TWO_FOR_19_99,
  TWO_FOR_22,
  TWO_FOR_24,
  TWO_FOR_25,
  TWO_FOR_27,
  // TWO_FOR_59_99,

  // 3 for €X
  THREE_FOR_10,
  THREE_FOR_10_DUPLICATE,
  THREE_FOR_11,
  THREE_FOR_12,
  THREE_FOR_13,
  THREE_FOR_2,
  THREE_FOR_3,
  THREE_FOR_35,
  THREE_FOR_3_DUPLICATE,
  THREE_FOR_5,
  THREE_FOR_6,
  THREE_FOR_6_50,
  THREE_FOR_7,
  THREE_FOR_7_50,
  THREE_FOR_8,
  THREE_FOR_9,
  THREE_FOR_99_99,

  // 4 for €X
  FOUR_FOR_10,
  FOUR_FOR_5,
  FOUR_FOR_6,
  FOUR_FOR_6_99,
  FOUR_FOR_7,
  FOUR_FOR_8,
  FOUR_FOR_9,
  FOUR_FOR_30,

  // 5 for €X
  FIVE_FOR_3,
  FIVE_FOR_5,
  FIVE_FOR_6,
  FIVE_FOR_10,

  // 8 for €X
  EIGHT_FOR_10,

  // 9 for €X
  NINE_FOR_9_99,

  // X% off
  TEN_PERCENT_OFF,
  FIFTEEN_PERCENT_OFF,
  TWENTY_PERCENT_OFF,
  TWENTY_FIVE_PERCENT_OFF,
  TWENTY_FIVE_PERCENT_EXTRA_OFF,
  THIRTY_PERCENT_OFF,
  THIRTY_THREE_PERCENT_OFF,
  THIRTY_FIVE_PERCENT_OFF,
  FOURTY_PERCENT_OFF,
  FIFTY_PERCENT_OFF,
  FIFTY_FIVE_PERCENT_OFF,
  SIXTY_PERCENT_OFF,
  SIXTY_ONE_PERCENT_OFF,
  SEVENTY_FIVE_PERCENT_EXTRA_OFF,

  // X% off by X amount
  FIFTY_PERCENT_OFF_BY_5,

  // All for €X each
  ALL_FOR_0_99_EACH,
  ALL_FOR_1_29_EACH,
  ALL_FOR_1_50_EACH,
  ALL_FOR_1_EACH,
  ALL_FOR_2_EACH,
  ALL_FOR_29_99_EACH,
  ALL_FOR_2_50_EACH,
  ALL_FOR_2_99_EACH,
  ALL_FOR_3_EACH,
  ALL_FOR_3_99_EACH,
  ALL_FOR_4_EACH,
  ALL_FOR_4_50_EACH,
  ALL_FOR_4_99_EACH,
  ALL_FOR_5_EACH,
  ALL_FOR_6_EACH,
  ALL_FOR_6_50_EACH,
  ALL_FOR_7_EACH,
  ALL_FOR_7_49_EACH,
  ALL_FOR_7_50_EACH,
  ALL_FOR_7_99_EACH,
  ALL_FOR_7_99_EACH_DUPLICATE,
  ALL_FOR_8_99_EACH,
  ALL_FOR_9_EACH,
  ALL_FOR_9_99_EACH,
  ALL_FOR_10_EACH,
  ALL_FOR_12_EACH,
  ALL_FOR_12_50_EACH,
  ALL_FOR_13_EACH,
  ALL_FOR_14_99_EACH,
  ALL_FOR_15_EACH,
  ALL_FOR_16_99_EACH,
  ALL_FOR_17_99_EACH,
  ALL_FOR_19_99_EACH,
  ALL_FOR_20_EACH,
  ALL_FOR_24_99_EACH,
  ALL_FOR_34_99_EACH,
  ALL_FOR_38_99_EACH,
  ALL_FOR_39_99_EACH,
  ALL_FOR_49_99_EACH,

  // All for €X per pack
  ALL_FOR_5_PER_PACK,

  // Second for ...
  SECOND_FOR_ONE,
  SECOND_FOR_TWO,
  SECOND_HALF_PRICE,
  SECOND_HALF_PRICE_DUPLICATE,

  // €X off
  TWO_OFF,
  THREE_OFF,
  FIVE_OFF,
  SIX_OFF,
  NINE_OFF,
  TEN_OFF,
  FIFTEEN_OFF,
  TWENTY_OFF,

  // For X
  FOR_1_49,
  FOR_3,
  FOR_3_99,
  FOR_4_39,
  FOR_4_99,
  FOR_5,
  FOR_5_75,
  FOR_5_99,
  FOR_6,
  FOR_7_99,
  FOR_9_99,
  FOR_10,
  FOR_11_99,
  FOR_12_50,
  FOR_13_95,
  FOR_14,
  FOR_14_99,
  FOR_15_99,
  FOR_17_49,
  FOR_24_99,
  FOR_25,
  FOR_26_50,
  FOR_35,
  FOR_54_99,
  FOR_59_99,
  FOR_69_99,
  FOR_89_99,
  // FOR_109,
  FOR_129_99,
  FOR_249_99,
}

const kruidvatDealInformation: Record<KruidvatDealType, IDealInformation> =
  Object.freeze({
    [KruidvatDealType.ONE_PLUS_ONE]: {
      calculation: (price: number) => price / 2,
      code: "1003",
      purchaseAmount: 2,
    },
    [KruidvatDealType.ONE_PLUS_ONE_DUPLICATE]: {
      calculation: (price: number) => price / 2,
      code: "5261",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_2]: {
      calculation: () => 2.5 / 2,
      code: "1007",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_2_50]: {
      calculation: () => 1,
      code: "1008",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_3]: {
      calculation: () => 3 / 2,
      code: "1010",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_4]: {
      calculation: () => 4 / 2,
      code: "1013",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_4_49]: {
      calculation: () => 4.49 / 2,
      code: "1202",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_4_50]: {
      calculation: () => 4.5 / 2,
      code: "4291",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_4_69]: {
      calculation: () => 4.69 / 2,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDI4NXxpbWFnZS9wbmd8YUdNM0wyaGpZeTh4TkRrM016TTRNRFkxTnpFNE1nfDRmNTg5M2U5NGI1NzI1NjA0MmZkMzFmMDA0MDMzOTZiYTk1ZDA2NmRjZDRkOWQwNjhmNDcxNWQyNGM0M2I4MmU",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_5]: {
      calculation: () => 5 / 2,
      code: "1014",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_6]: {
      calculation: () => 6 / 2,
      code: "1016",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_7]: {
      calculation: () => 7 / 2,
      code: "1018",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_7_50]: {
      calculation: () => 7.5 / 2,
      code: "1204",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_8]: {
      calculation: () => 8 / 2,
      code: "1020",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_9]: {
      calculation: () => 9 / 2,
      code: "1022",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_10_95]: {
      calculation: () => 10.95 / 2,
      code: "4623",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_13]: {
      calculation: () => 13 / 2,
      code: "1237",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_18]: {
      calculation: () => 18 / 2,
      code: "1239",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_20]: {
      calculation: () => 20 / 2,
      code: "1034",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_29_99]: {
      calculation: () => 29.99 / 2,
      code: "1035",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_19_99]: {
      calculation: () => 19.99 / 2,
      code: "1196",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_22]: {
      calculation: () => 22 / 2,
      code: "1235",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_24]: {
      calculation: () => 24 / 2,
      code: "4626",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_25]: {
      calculation: () => 25 / 2,
      code: "1209",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_27]: {
      calculation: () => 27 / 2,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDU2OXxpbWFnZS9wbmd8YURsbEwyaGlPQzh4TlRZd01UWTJNREl6TVRjeE1BfGNlNmQ4OTc1MmYyYzVlZWM0YTE3YWUyOWI0MTllNjVmMWMyMzg4Y2E1Y2QxOWUzZDlhMGQ0ZmQ3MmQxZjgyZTM",
      purchaseAmount: 2,
    },
    // INCORRECT CODE
    // [KruidvatDealType.TWO_FOR_59_99]: {
    //   calculation: () => 59.99 / 2,
    //   code: "1034",
    //   purchaseAmount: 2,
    // },
    [KruidvatDealType.THREE_FOR_3]: {
      calculation: () => 1,
      code: "4603",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_3_DUPLICATE]: {
      calculation: () => 1,
      code: "1042",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_5]: {
      calculation: () => 5 / 3,
      code: "4160",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_6]: {
      calculation: () => 6 / 3,
      code: "1044",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_6_50]: {
      calculation: () => 6.5 / 3,
      code: "4267",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_9]: {
      calculation: () => 9 / 3,
      code: "1047",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_99_99]: {
      calculation: () => 99.99 / 3,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDU5OXxpbWFnZS9wbmd8YUdGakwyZzFOeTh6TVRBeE1EWXlNekF5T1RJM09BfDBkNjA3MjdhMmVlYzE3MzQ4OTM1NjIxM2JiMTFhNTBlNmM2NTI5NmEzNzE5YjBlODE0OTRhNWY0MTQ4ZDcwYzI",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_10]: {
      calculation: () => 10 / 3,
      code: "1048",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_10_DUPLICATE]: {
      calculation: () => 10 / 3,
      code: "13515",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_11]: {
      calculation: () => 11 / 3,
      code: "4310",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_12]: {
      calculation: () => 12 / 3,
      code: "1226",
      purchaseAmount: 3,
    },
    [KruidvatDealType.TWO_FOR_10]: {
      calculation: () => 10 / 2,
      code: "1025",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_12]: {
      calculation: () => 12 / 2,
      code: "1028",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_11]: {
      calculation: () => 11 / 2,
      code: "1027",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_PLUS_ONE]: {
      calculation: (price: number) => (price + price) / 3,
      code: "1036",
      purchaseAmount: 3,
    },
    [KruidvatDealType.TWO_PLUS_TWO]: {
      calculation: (price: number) => price / 2,
      code: "1037",
      purchaseAmount: 4,
    },
    [KruidvatDealType.TWO_PLUS_THREE]: {
      calculation: (price: number) => (price + price) / 5,
      code: "1118",
      purchaseAmount: 5,
    },
    [KruidvatDealType.THREE_PLUS_TWO]: {
      calculation: (price: number) => (price * 3) / 5,
      code: "1050",
      purchaseAmount: 5,
    },
    [KruidvatDealType.SIX_PLUS_ONE]: {
      calculation: (price: number) => (price * 6) / 7,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDc0OXxpbWFnZS9wbmd8YURObUwyaGtNQzh6TXpZeU56WXlPVFV4T0RnM09BfDU1ZGRlZGQ2ODkyNDIwMmQyNTM4NzdkY2E3OTgwN2UyMzE3YTI1OTU0NDMyZDJjY2Y0MzEyNDA1ZjE0OTNkNzI",
      purchaseAmount: 7,
    },
    [KruidvatDealType.SECOND_FOR_ONE]: {
      calculation: (price: number) => (price + 1) / 2,
      code: "1038",
      purchaseAmount: 2,
    },
    [KruidvatDealType.SECOND_FOR_TWO]: {
      calculation: (price: number) => (price + 2) / 2,
      code: "1228",
      purchaseAmount: 2,
    },
    [KruidvatDealType.SECOND_HALF_PRICE]: {
      calculation: (price: number) => price * 0.75,
      code: "1039",
      purchaseAmount: 2,
    },
    [KruidvatDealType.SECOND_HALF_PRICE_DUPLICATE]: {
      calculation: (price: number) => price * 0.75,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDYzNHxpbWFnZS9wbmd8YURVeEwyZzRNUzh4TkRrME56UTNNalUzTWpRME5nfDBjOGI1YjYxMDBkMWE1YzIzMGFkMGY3OTQyODNiYjQ0N2YxYzJhMDI4ZWJmZGI2OWI1MzBhOWU1YTY3MjkyZGY",
      purchaseAmount: 2,
    },
    [KruidvatDealType.FOUR_FOR_5]: {
      calculation: () => 5 / 4,
      code: "1054",
      purchaseAmount: 4,
    },
    [KruidvatDealType.TEN_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.1,
      code: "1058",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FIFTEEN_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.15,
      code: "1059",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TWENTY_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.2,
      code: "1061",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TWENTY_FIVE_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.25,
      code: "1062",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TWENTY_FIVE_PERCENT_EXTRA_OFF]: {
      calculation: (price: number) => price - price * 0.25,
      code: "1557",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THIRTY_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.3,
      code: "1064",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THIRTY_THREE_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.33,
      code: "1193",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THIRTY_FIVE_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.35,
      code: "1065",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOURTY_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.4,
      code: "1067",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FIFTY_PERCENT_OFF]: {
      calculation: (price: number) => price * 0.5,
      code: "1068",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FIFTY_FIVE_PERCENT_OFF]: {
      calculation: (price: number) => price * 0.55,
      code: "1131",
      purchaseAmount: 1,
    },
    [KruidvatDealType.SIXTY_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.6,
      code: "1133",
      purchaseAmount: 1,
    },
    [KruidvatDealType.SIXTY_ONE_PERCENT_OFF]: {
      calculation: (price: number) => price - price * 0.61,
      code: "4970",
      purchaseAmount: 1,
    },
    [KruidvatDealType.SEVENTY_FIVE_PERCENT_EXTRA_OFF]: {
      calculation: (price: number) => price - price * 0.75,
      code: "1450",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_1_EACH]: {
      calculation: () => 1,
      code: "1086",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THREE_FOR_2]: {
      calculation: () => 2 / 3,
      code: "1167",
      purchaseAmount: 3,
    },
    [KruidvatDealType.FIVE_FOR_3]: {
      calculation: () => 3 / 5,
      code: "1159",
      purchaseAmount: 5,
    },
    [KruidvatDealType.FIVE_FOR_5]: {
      calculation: () => 1,
      code: "1176",
      purchaseAmount: 5,
    },
    [KruidvatDealType.FIVE_FOR_6]: {
      calculation: () => 6 / 5,
      code: "4110",
      purchaseAmount: 5,
    },
    [KruidvatDealType.FIVE_FOR_10]: {
      calculation: () => 2,
      code: "1145",
      purchaseAmount: 5,
    },
    [KruidvatDealType.EIGHT_FOR_10]: {
      calculation: () => 10 / 8,
      code: "1572",
      purchaseAmount: 8,
    },
    [KruidvatDealType.NINE_FOR_9_99]: {
      calculation: () => 9.99 / 9,
      code: "4141",
      purchaseAmount: 9,
    },
    [KruidvatDealType.FOUR_FOR_10]: {
      calculation: () => 10 / 4,
      code: "1183",
      purchaseAmount: 4,
    },
    [KruidvatDealType.THREE_FOR_7]: {
      calculation: () => 7 / 3,
      code: "1191",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_7_50]: {
      calculation: () => 7.5 / 3,
      code: "1045",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_13]: {
      calculation: () => 13 / 3,
      code: "4550",
      purchaseAmount: 3,
    },
    [KruidvatDealType.THREE_FOR_35]: {
      calculation: () => 35 / 3,
      code: "1563",
      purchaseAmount: 3,
    },
    [KruidvatDealType.FOUR_FOR_6]: {
      calculation: () => 6 / 4,
      code: "1189",
      purchaseAmount: 4,
    },
    [KruidvatDealType.FOUR_FOR_6_99]: {
      calculation: () => 6.99 / 4,
      code: "1262",
      purchaseAmount: 4,
    },
    [KruidvatDealType.FOUR_FOR_7]: {
      calculation: () => 7 / 4,
      code: "1382",
      purchaseAmount: 4,
    },
    [KruidvatDealType.FOUR_FOR_8]: {
      calculation: () => 8 / 4,
      code: "1403",
      purchaseAmount: 4,
    },
    [KruidvatDealType.FOUR_FOR_9]: {
      calculation: () => 9 / 4,
      code: "1402",
      purchaseAmount: 4,
    },
    [KruidvatDealType.FOUR_FOR_30]: {
      calculation: () => 30 / 4,
      code: "1578",
      purchaseAmount: 4,
    },
    [KruidvatDealType.TWO_FOR_9_95]: {
      calculation: () => 9.95 / 2,
      code: "1024",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_9_99]: {
      calculation: () => 9.99 / 2,
      code: "1153",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_14]: {
      calculation: () => 14 / 2,
      code: "1238",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_15]: {
      calculation: () => 15 / 2,
      code: "1156",
      purchaseAmount: 2,
    },
    [KruidvatDealType.TWO_FOR_16]: {
      calculation: () => 16 / 2,
      code: "1031",
      purchaseAmount: 2,
    },
    [KruidvatDealType.ALL_FOR_1_50_EACH]: {
      calculation: () => 1.5,
      code: "1088",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_2_50_EACH]: {
      calculation: () => 2.5,
      code: "1415",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_2_99_EACH]: {
      calculation: () => 2.99,
      code: "1092",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_3_99_EACH]: {
      calculation: () => 3.99,
      code: "1412",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_7_99_EACH]: {
      calculation: () => 7.99,
      code: "1104",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_7_99_EACH_DUPLICATE]: {
      calculation: () => 7.99,
      code: "1080",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_2_EACH]: {
      calculation: () => 2,
      code: "1090",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_3_EACH]: {
      calculation: () => 3,
      code: "1093",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_4_EACH]: {
      calculation: () => 4,
      code: "1095",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_4_50_EACH]: {
      calculation: () => 4.5,
      code: "1324",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_4_99_EACH]: {
      calculation: () => 4.99,
      code: "1096",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_5_EACH]: {
      calculation: () => 5,
      code: "1097",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_6_EACH]: {
      calculation: () => 6,
      code: "1100",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_6_50_EACH]: {
      calculation: () => 6.5,
      code: "1366",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_7_EACH]: {
      calculation: () => 7,
      code: "1101",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_7_49_EACH]: {
      calculation: () => 7.49,
      code: "1102",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_7_50_EACH]: {
      calculation: () => 7.5,
      code: "1103",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_8_99_EACH]: {
      calculation: () => 8.99,
      code: "1407",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_9_EACH]: {
      calculation: () => 9,
      code: "1107",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_9_99_EACH]: {
      calculation: () => 9.99,
      code: "1109",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_10_EACH]: {
      calculation: () => 10,
      code: "1110",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_12_EACH]: {
      calculation: () => 12,
      code: "1180",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_12_50_EACH]: {
      calculation: () => 12.5,
      code: "1368",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_13_EACH]: {
      calculation: () => 13,
      code: "1399",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_14_99_EACH]: {
      calculation: () => 14.99,
      code: "1231",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_15_EACH]: {
      calculation: () => 15,
      code: "1112",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_16_99_EACH]: {
      calculation: () => 16.99,
      code: "1431",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_17_99_EACH]: {
      calculation: () => 17.99,
      code: "1493",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_19_99_EACH]: {
      calculation: () => 19.99,
      code: "1150",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_20_EACH]: {
      calculation: () => 20,
      code: "1114",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_24_99_EACH]: {
      calculation: () => 24.99,
      code: "1490",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THREE_FOR_8]: {
      calculation: () => 8 / 3,
      code: "1328",
      purchaseAmount: 3,
    },
    [KruidvatDealType.FIFTY_PERCENT_OFF_BY_5]: {
      calculation: (price: number) => price * 0.5,
      code: "5489",
      purchaseAmount: 5,
    },
    [KruidvatDealType.ALL_FOR_0_99_EACH]: {
      calculation: () => 0.99,
      code: "1085",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_1_29_EACH]: {
      calculation: () => 1.29,
      code: "1411",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_29_99_EACH]: {
      calculation: () => 29.99,
      code: "1115",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_34_99_EACH]: {
      calculation: () => 34.99,
      code: "1455",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_38_99_EACH]: {
      calculation: () => 38.99,
      code: "1507",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_39_99_EACH]: {
      calculation: () => 39.99,
      code: "1425",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_49_99_EACH]: {
      calculation: () => 49.99,
      code: "1453",
      purchaseAmount: 1,
    },
    [KruidvatDealType.ALL_FOR_5_PER_PACK]: {
      calculation: () => 5,
      code: "1175",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TWO_OFF]: {
      calculation: (price: number) => price - 2,
      code: "1004",
      purchaseAmount: 1,
    },
    [KruidvatDealType.THREE_OFF]: {
      calculation: (price: number) => price - 3,
      code: "1040",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FIVE_OFF]: {
      calculation: (price: number) => price - 5,
      code: "1055",
      purchaseAmount: 1,
    },
    [KruidvatDealType.SIX_OFF]: {
      calculation: (price: number) => price - 6,
      code: "1187",
      purchaseAmount: 1,
    },
    [KruidvatDealType.NINE_OFF]: {
      calculation: (price: number) => price - 9,
      code: "1356",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TEN_OFF]: {
      calculation: (price: number) => price - 10,
      code: "1057",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FIFTEEN_OFF]: {
      calculation: (price: number) => price - 15,
      code: "1251",
      purchaseAmount: 1,
    },
    [KruidvatDealType.TWENTY_OFF]: {
      calculation: (price: number) => price - 20,
      code: "1179",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_1_49]: {
      calculation: () => 1.49,
      code: "4169",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_3]: {
      calculation: () => 3,
      code: "4227",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_3_99]: {
      calculation: () => 3.99,
      code: "4149",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_4_39]: {
      calculation: () => 4.39,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDMzNHxpbWFnZS9wbmd8YURObEwyZzBZUzh6TXpnMU1EQTJOVFU0TkRFMU9BfDY3OWMzMDE5MWE0OTgyZDM2NTk2MjEzYWVkMjMwMjE3NGVlMzk2YzAxNWEwMWNlNzAzMWZmMmZhZTgzZjBkMWU",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_4_99]: {
      calculation: () => 4.99,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDE3N3xpbWFnZS9wbmd8YUdGbEwyZzJZaTh6TWpNM05qRXpNVGM0TURZek9BfDU0ODQxNDlhOWZhNjJmNjQyZmZjYTMyYmJlN2M4N2MzNGVhNTgwMDk3MmUxYTk3OWQwM2Q4ZGEyMzVhZTBiOTg",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_5]: {
      calculation: () => 5,
      code: "4190",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_5_75]: {
      calculation: () => 5.75,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDE1OXxpbWFnZS9wbmd8YURRekwyaGpPQzh6TkRFeU1qYzVNalUyTmpneE5BfDRhY2E1Mzg1MzJlNWQ5NDQ3MjIzNTI3OWU3NDQ5NjVmMTk0NDIzYjQyYjBmZjUwMmQ5MmYwNmIyNWZjM2EwYzE",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_5_99]: {
      calculation: () => 5.99,
      code: "4198",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_6]: {
      calculation: () => 6,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDE2OHxpbWFnZS9wbmd8YURjd0wyZzBZUzh6TWpFNE16UTRNamswTVRRM01BfGJjN2E4ZjI4OTZkZDQzNGVkZWI3NGUwYzEyMzc1MDViYWQzNGY1MzFmOTFkZjliZDAzNzE1NmZkM2QzZTcxNjc",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_7_99]: {
      calculation: () => 7.99,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDE2OHxpbWFnZS9wbmd8YURReUwyZ3pOQzh6TWpJME1qazJPVFEzTnpFMU1BfDM5NTRlYmExNTYyN2YwZmE5YjI0NTk0YTA2NDE5YTc0ZjViMDRkZDY5ZTk0MWY4NWFiYTdkMzc5ZmM0Yzc2YzE",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_9_99]: {
      calculation: () => 9.99,
      code: "4202",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_10]: {
      calculation: () => 10,
      code: "4494",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_11_99]: {
      calculation: () => 11.99,
      code: "4347",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_12_50]: {
      calculation: () => 12.5,
      code: "4610",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_13_95]: {
      calculation: () => 13.95,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDYyMXxpbWFnZS9wbmd8YURGbUwyaGxPUzh6TWpRMk16UTFNalkyTnprek5BfDg3NzJjOWJlODUxYWI2ZGJkMWY0YmIwY2Q1NjExZmJhZTBlNjkzZDAzNDgwMmRmNzQzNTk3NDMyN2YyM2UzN2E",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_14]: {
      calculation: () => 14,
      code: "4494",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_14_99]: {
      calculation: () => 14.99,
      code: "4499",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_15_99]: {
      calculation: () => 15.99,
      code: "4525",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_17_49]: {
      calculation: () => 17.49,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDQyOXxpbWFnZS9wbmd8YURReUwyZzVaUzh5TnpJME9UQXhORGd6TXpFNE1nfDA0MDhhZDc1YjAzOTgzMDQ2ZTkzMjVmNWQ1YWMxNGY0NWQyY2E1YTRlMmUyYjllYTgwN2M4MDI1NjQxMDkwNGI",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_24_99]: {
      calculation: () => 24.99,
      code: "4626",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_25]: {
      calculation: () => 25,
      code: "4628",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_26_50]: {
      calculation: () => 26.5,
      code: "4765",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_35]: {
      calculation: () => 35,
      code: "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NDY0NHxpbWFnZS9wbmd8YUdSbEwyZzROeTh6TXpBMU56YzNNRGM1T1RFek5BfGI0NzdlNzFlNzNjNjE3MzEzN2E2ZTY2YTcxNzg0ZTU2ZDcxNDc1YzEwZWIyMTM3OTIyYTM3Y2Y5OTVhMjcyOGM",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_54_99]: {
      calculation: () => 54.99,
      code: "4432",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_59_99]: {
      calculation: () => 59.99,
      code: "4467",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_69_99]: {
      calculation: () => 69.99,
      code: "4590",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_89_99]: {
      calculation: () => 89.99,
      code: "4597",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_129_99]: {
      calculation: () => 129.99,
      code: "4496",
      purchaseAmount: 1,
    },
    [KruidvatDealType.FOR_249_99]: {
      calculation: () => 249.99,
      code: "4605",
      purchaseAmount: 1,
    },
  });

const ignoredDeals = new Set([
  "1404",
  "1142",
  "1447",
  "4252",
  "4302",
  "4108",
  "4939",
  "bWFzdGVyfHByb21vdGlvbi1sYWJlbHN8NjIwM3xpbWFnZS9wbmd8YUdFMUwyaGxPQzh6TXpjeE56azBOVEEzTXpZNU5BfDBjZjFiYTBkMWE0Zjk5OGJmMTBlYzJlZTRhNjZiMmVjM2M2OTZkMzA2YWI4NmMzN2UxMWYzOTZkMDNhOGE1MDA",
]);

const parseProductPrice = (priceText: string | null = ""): number => {
  const priceParts = priceText?.split("\n").map((part) => part.trim()) ?? [];
  return Number(priceParts.join("") || 0);
};

export class Kruidvat extends ScrapeWebsiteService {
  shopName = "Kruidvat";

  protected baseUrl = "https://www.kruidvat.nl";
  protected paths = [
    "/baby",
    "/beauty",
    "/beauty/fohn-haarstyler/c/20014",
    "/beauty/geuren-geschenksets/c/20017",
    "/beauty/geuren-geschenksets/geschenksets/c/30030",
    "/beauty/haaraccessoires/c/20015",
    "/beauty/haarverzorging/c/20013",
    "/beauty/haarverzorging/curly-girl-methode/c/haarverzorging",
    "/beauty/luxe-beauty/c/luxe-beauty",
    "/beauty/make-up-accessoires/c/20090",
    "/beauty/make-up/c/20018",
    "/beauty/nieuw-in-beauty/c/MLP10066",
    "/beauty/skincare-man/c/20020",
    "/beauty/skincare-vrouw/c/20019",
    "/beauty/voordeelverpakkingen-beauty/c/MLP10083",
    "/beauty/zonnebrand-aftersun/c/30060",
    "/elektronica",
    "/eten-en-drinken",
    "/fashion",
    "/gezondheid",
    "/huishouden",
    "/speelgoed",
    "/sport",
    "/verzorging",
    "/verzorging/duurzamere-keuze/alle-duurzamere-beautyproducten/c/MLP10139",
    "/verzorging/duurzamere-keuze/alle-duurzamere-verzorgingsproducten/c/MLP10138",
    "/verzorging/intieme-verzorging/inlegkruisjes",
    "/verzorging/lichaamsverzorging/bad-en-douche-producten/c/30057",
    "/verzorging/lichaamsverzorging/c/20021",
    "/verzorging/lichaamsverzorging/deodorant/c/30056",
    "/verzorging/lichaamsverzorging/handzeep-handgel/c/30062",
    "/verzorging/mannen-verzorging/c/MLP10060",
    "/verzorging/mondverzorging/c/20012",
    "/verzorging/natuurlijke-producten/c/groen-lichaamsverzorging",
    "/verzorging/scheren-ontharen/c/20022",
    "/verzorging/scheren-ontharen/scheermesjes/c/30070",
    "/verzorging/zonbescherming/zonnebrand",
    "/voordeelverpakkingen-verzorging/c/MLP10081",
  ];

  protected setPage(url: URL, page: number): URL {
    url.searchParams.set("page", page.toString());
    return url;
  }

  protected getPageAmount(document: Document): number {
    const pagerText = document.querySelector(".pager__range")?.textContent;
    return pagerText ? this.#getPagerNumbers(pagerText) : 0;
  }

  protected modifyURL(url: URL): URL {
    url.searchParams.set("size", "100");
    url.searchParams.set("sort", "name-asc");
    return url;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  protected getPageDeals(document: Document): IProductDeal[] {
    const deals: IProductDeal[] = [];

    const productList = document.querySelector("#productList");

    if (!productList) {
      return deals;
    }

    const products = [...productList.querySelectorAll(":scope > *")];

    for (const product of products) {
      const productDealImage = product.querySelector("img.roundel__img");
      if (!productDealImage) {
        continue;
      }

      const partnerSale = product.querySelector(".tile__badge");
      if (partnerSale?.innerHTML.includes("Verkoop via partner")) {
        continue;
      }

      // eslint-disable-next-line unicorn/prefer-dom-node-dataset
      const deal = productDealImage.getAttribute("data-src");
      if (!deal) {
        continue;
      }

      const title = product.querySelector("a.tile__product-slide-product-name");
      if (!title) {
        continue;
      }

      const productUrl = `${this.baseUrl}${title.getAttribute("href")}`;

      const dealCode = this.#getDealCodeFromSrc(deal);
      if (!dealCode) {
        const dealNumber = deal.split("/").at(-1)?.split(".").at(0);
        if (dealNumber && ignoredDeals.has(dealNumber)) {
          continue;
        }

        const context = this.#getContext(deal);

        if (context) {
          if (ignoredDeals.has(context)) {
            continue;
          }

          const contextCode = this.#decodeContext(context);
          if (contextCode && ignoredDeals.has(contextCode)) {
            continue;
          }
        }

        this.reportUnknownDeal({
          productUrl,
          promotionText: deal.split("/").at(-1) ?? "Unknown Deal",
        });
        continue;
      }

      let text = title.textContent?.trim();
      const description = product
        .querySelector(".tile__product-slide-product-description")
        ?.textContent?.trim();
      if (description) {
        text = `${text} - ${description}`;
      }

      const productPrice = product.querySelector(".pricebadge__new-price");
      const priceText = parseProductPrice(productPrice?.textContent);
      const productImage =
        product
          .querySelector("img.tile__product-slide-image")
          ?.getAttribute("data-src") ??
        product
          .querySelector("img.tile__product-slide-image")
          ?.getAttribute("src");

      deals.push({
        dealPrice:
          // Deal prices are rounded down when they are not whole cents.
          Math.floor(
            kruidvatDealInformation[dealCode].calculation(priceText) * 100,
          ) / 100,
        imageUrl: this.baseUrl + productImage || "",
        name: text?.trim() ?? "Unknown product",
        price: priceText,
        productUrl,
        purchaseAmount: kruidvatDealInformation[dealCode].purchaseAmount,
      });
    }

    return deals;
  }

  #getPagerNumbers(pagerText: string): number {
    const pagerParts = pagerText.split("\n") || [];
    const pages = pagerParts
      .map((part) => part.trim())
      .filter((part) => /^\d+$/.exec(part));
    const lastPage = pages.at(-1);
    return Number(lastPage ?? 0);
  }

  #getDealCodeFromSrc(source: string): KruidvatDealType | void {
    const dealCode = /\/(\d*)\.png/.exec(source);
    if (dealCode?.[1]) {
      return this.#getDealTypeFromCode(dealCode[1]);
    }

    const context = this.#getContext(source);
    if (context) {
      const dealType = this.#getDealTypeFromCode(context);
      if (dealType) {
        return dealType;
      }

      const contextCode = this.#decodeContext(context);
      if (contextCode) {
        return this.#getDealTypeFromCode(contextCode);
      }
    }
  }

  #getContext(source: string): string | undefined {
    const dealContext = /context=(.*)/.exec(source);
    return dealContext?.at(1);
  }

  #decodeContext(contextText: string): string | void {
    const context = Buffer.from(contextText, "base64").toString("ascii");
    const contextCodeMatch = /\|(\d*)\|/.exec(context);
    if (contextCodeMatch?.at(1)) {
      return contextCodeMatch.at(1);
    }
  }

  #getDealTypeFromCode(codeText: string): KruidvatDealType | void {
    const dealType = Object.entries(kruidvatDealInformation).find(
      (value) => value[1].code === codeText,
    );

    if (dealType) {
      return dealType[0] as unknown as KruidvatDealType;
    }
  }
}
