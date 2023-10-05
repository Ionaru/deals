import { DealDTO } from "../entities/deal";

export type IDealsRequest = Record<string, never>;

export interface IDealsResponse {
  deals: DealDTO[];
}
