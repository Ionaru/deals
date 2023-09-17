import { ServiceDTO } from '../entities/service';

export type IHealthRequest = Record<string, never>;

export interface HealthResponse extends ServiceDTO {
    status: {
        status: string;
        uptime?: number;
    };
}
