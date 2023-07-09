import { ServiceDTO } from '../entities/service';

export type IHealthRequest = Record<string, never>;

interface HealthResponse extends ServiceDTO {
    status: {
        status: string;
        uptime?: number;
    };
}

export type IHealthResponse = HealthResponse[];
