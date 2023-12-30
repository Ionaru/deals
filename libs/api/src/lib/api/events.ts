import { IProductDeal, IUnknownDeal } from "../api";

export enum MSEvent {
  REPORT_SERVICE = "REPORT_SERVICE",
  DEAL_FOUND = "DEAL_FOUND",
  UNKNOWN_DEAL = "UNKNOWN_DEAL",
}

export interface IMSEvent {
  [MSEvent.REPORT_SERVICE]: Record<string, never>;

  [MSEvent.DEAL_FOUND]: {
    deals: IProductDeal[];
    shop: string;
    clear: boolean;
  };

  [MSEvent.UNKNOWN_DEAL]: {
    deal: IUnknownDeal;
    shop: string;
  };
}

export type MSEPayload<T extends keyof IMSEvent> = IMSEvent[T];
