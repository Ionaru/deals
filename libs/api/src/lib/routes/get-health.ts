import { ServiceDTO } from "../entities/service.js";

export type IHealthRequest = Record<string, never>;

export interface HealthResponse extends ServiceDTO {
  status: {
    status: string;
    uptime?: number;
  };
}
