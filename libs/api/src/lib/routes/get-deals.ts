import { DealDTO } from "../entities/deal.js";

export type IDealsRequest = Record<string, never>;

export interface IDealsResponse {
  deals: DealDTO[];
}
